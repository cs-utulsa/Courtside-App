import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
//this alert is not connected to any other components but 
//keeping it just in case 
interface AlertButtonProps {
  message: string;
  showAlert: boolean;
}

export const AlertButton: React.FC<AlertButtonProps> = ({ message, showAlert }) => {
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

  return (
    <TouchableOpacity style={styles.button} onPress={handleClick}>
    
      {show && (
        <View style={styles.alert}>
          <Text style={styles.alertText}>{message}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 10,
    marginTop:-20,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  alert: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

