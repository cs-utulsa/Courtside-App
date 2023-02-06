import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { AuthSubmitButton, LogoHeader, SmallLink } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from './../types/Navigation';

export const GetStartedScreen = () => {
    const width = Dimensions.get('window').width;

    const { navigate } = useNavigation<AuthNavigationProp>();

    return (
        <View style={styles.container}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                renderItem={({ index }) => (
                    <View style={styles.carouselItem}>
                        <Text style={styles.text}>{index}</Text>
                    </View>
                )}
            />
            <LogoHeader />
            <AuthSubmitButton
                disabled={false}
                loading={false}
                text="Get Started"
                submitFn={() => navigate('SignUp')}
            />
            <SmallLink
                text="Already a User?"
                onPress={() => navigate('SignIn')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    carouselItem: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
    },
});
