import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

type Props = {
    navigation: NavigationProp<any>;
};

const SplashScreen = ({ navigation }: Props) => {
    const handleSignIn = () => {
        navigation.navigate('TabNavBar');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.title}>Welcome to Habits</Text>
            </View>
            <AnimatedLottieView style={styles.center}
            source={require('./logo.json')}
            autoPlay
            loop />
            <View style={styles.footer}>
            <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#B6D0E2',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 100,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 80,
    },
    title: {
        color: '#F5F5DC',
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#7FB3D5',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SplashScreen;
