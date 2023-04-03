import React from 'react';
import {
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Animated, Image, StyleSheet, View } from 'react-native';
//import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { TouchableWithoutFeedback } from 'react-native';
import { ThemeText } from '@components/index';
import { useState } from 'react';

import { useTheme } from '@react-navigation/native';


  

export const ButtonHeart: React.FC = () => {
  const { colors } = useTheme();
  const [iconName, setIconName] = useState('star-border');

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
            onPress={() => {}}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
          <View>
            <Animated.View style={[styles.iconContainer, animatedScaleStyle]}>
            <MaterialIcons name={iconName} size={64} color= {colors.primary} />
            
            </Animated.View>
            <ThemeText style={styles.text}>Favorite</ThemeText>
            </View>
      </TouchableWithoutFeedback>
      
    );
};

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
});







