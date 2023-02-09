import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { AuthSubmitButton, LogoHeader, SmallLink } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from './../types/Navigation';

const images: { image: any; text: string }[] = [
    {
        image: require('./../assets/images/basketball-player.png'),
        text: 'Follow your favorite teams and players!',
    },
    {
        image: require('./../assets/images/crowd.png'),
        text: 'Customize your fan experience!',
    },
    {
        image: require('./../assets/images/tennis.png'),
        text: 'Keep track of sports stats your way!',
    },
];

export const GetStartedScreen = () => {
    const width = Dimensions.get('window').width;

    const { navigate } = useNavigation<AuthNavigationProp>();

    return (
        <View style={styles.container}>
            <Carousel
                loop
                width={width}
                height={width}
                autoPlay={true}
                scrollAnimationDuration={2500}
                data={images}
                renderItem={({ item }) => (
                    <View style={styles.carouselItem}>
                        <Image style={styles.itemImage} source={item.image} />
                        <Text style={styles.itemText}>{item.text}</Text>
                    </View>
                )}
            />
            <LogoHeader />
            <AuthSubmitButton
                disabled={false}
                loading={false}
                text="Get Started"
                submitFn={() => navigate('SportsSelect')}
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        textAlign: 'center',
        fontSize: 25,
        height: 60,
        marginHorizontal: 10,
    },
    itemImage: {
        resizeMode: 'contain',
        width: 200,
        height: 200,
        borderRadius: 999,
        marginBottom: 10,
    },
});
