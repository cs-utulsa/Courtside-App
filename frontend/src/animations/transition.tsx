import React from 'react';
import {
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Animated, ButtonProps, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
//import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { TouchableWithoutFeedback } from 'react-native';
import { ThemeText } from '@components/index';
import { useState } from 'react';

import { useTheme } from '@react-navigation/native';

import {  useEffect } from 'react';
  
type CustomButtonProps = {
  onPress: () => void;
  isLiked: boolean;
}

export const ButtonHeart: React.FC<CustomButtonProps> = ({onPress, isLiked}) => {
  const { colors } = useTheme();
  console.log(isLiked+"propbool");
  const [iconName, setIconName] = useState(isLiked ? 'star' : 'star-border');
  useEffect(() => {
    setIconName(isLiked ? 'star' : 'star-border');
  }, [isLiked]);
    // Initial scale value of 1 means no scale applied initially.
    const animatedButtonScale = new Animated.Value(1);
    // When button is pressed in, animate the scale to 1.5
    const onPressIn = () => {
        Animated.spring(animatedButtonScale, {
            toValue: 1.5,
            useNativeDriver: true,
        }).start();
    };

    // When button is pressed out, animate the scale back to 1
    const onPressOut = () => {
        Animated.spring(animatedButtonScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
        setIconName(iconName === "star-border" ? "star" : "star-border");
    };

    // The animated style for scaling the button within the Animated.View
    const animatedScaleStyle = {
        transform: [{scale: animatedButtonScale}]
    };

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
          <View>
            <Animated.View style={[styles.iconContainer, animatedScaleStyle]}>
            <MaterialIcons name={iconName} size={64} color= {colors.primary} />
            
            </Animated.View>
            </View>
      </TouchableWithoutFeedback>
      
    );
};

export const Toggler = ({onPress, isToggled}) => {
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onPress();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption === 'option1' && styles.selectedOptionButton,
        ]}
        disabled={isToggled}
        onPress={() => handleOptionSelect('option1')}
      >
         
        <Text style={styles.optionButtonText}>Biodata</Text>

      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption === 'option2' && styles.selectedOptionButton,
        ]}
        onPress={() => handleOptionSelect('option2')}
        disabled={!isToggled}
      >
         <Text style={styles.optionButtonText2}> Season Stats</Text>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    // textAlign: '',
    fontWeight: 'bold',
    margin: 5,
    textAlign: 'center',
    marginLeft: 27,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    width:284,
    height:34,
    borderWidth: 2,
    borderColor: 'lightgrey',
    
  },
  optionButton: {
    width: 140,
    paddingVertical: 0,
    marginLeft:0,
    marginRight:0,
    height:30,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  selectedOptionButton: {
    backgroundColor: 'orange',
    borderColor: '#4a90e2',
  },
  optionButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginLeft:-80,
    marginRight:-80,
    
  },
  optionButtonText2: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginLeft:-80,
    marginRight:-80,
   
  },

  debugBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    backgroundColor: 'red',
    opacity: 0.5,
    zIndex: 9999,
  },
});







//may need to get rid of this wrapper to include alert inthe bigger view

//wrapper for teams, a second wrapper will be made for favoriting players
//this buttonwrapper is not used anymore but keeping it just in case
const ButtonHeartWrapper = () => {
  const [isLiked, setIsLiked] = useState(false);
  const route = useRoute<TeamScreenRouteProp>(); //variable also declared in teamScreen
  const team = route.params.team;
  const { authData, updateTeams } = useAuth();
  const [selectedTeams, setSelectedTeams] = useState<string[]>(
    authData?.teams ?? []
  );
  //const [submitting, setSubmitting] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [show, setShow] = useState<boolean>(showAlert);

  useEffect(() => {
    setShow(showAlert);
  }, [showAlert]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (show) {
      timeoutId = setTimeout(() => {
        setShow(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [show]);

  const handleClick = () => {
    setShow(true);
  };

  //const submitTeamSelectionUpdates = async () => {
  //setSubmitting(true);
  //   await updateTeams(selectedTeams);
  //rosterNavigation.navigate('Dashboard');
  // setSubmitting(false);
  //};
  const handlePress = () => {
    // run code here when button is pressed
    const teamid = team.id;

    if (isLiked) {
      const updatedTeams = selectedTeams.filter((team) => team !== teamid);
      setSelectedTeams(updatedTeams); //idk if this line works.
      updateTeams(updatedTeams);
      setMessage("BRUH");
      setShow(true);
      //I clikced it relatively fast, but may want the async function!!!
      //could end up removing and adding too fast...
      //submitTeamSelectionUpdates();
    } else {
      console.log(selectedTeams);
      console.log(teamid);
      const updatedTeams = selectedTeams.concat(teamid);
      console.log(updatedTeams);
      setSelectedTeams(updatedTeams);
      updateTeams(updatedTeams);
      //I clikced it relatively fast, but may want the async function!!!
      //could end up removing and adding too fast...
    }
    setIsLiked(!isLiked); // toggle the state of the button
    //need to figure out this isliked. 

  };

  return ( //pretty sure the title does not matter.
    <View>
      <ButtonHeart onPress={handlePress} isLiked={isLiked} />


      {show && (
        <View style={styles.alert}>
          <Text style={styles.alertText}>{message}</Text>
        </View>
      )}

    </View>
  );
};

export default ButtonHeartWrapper;
