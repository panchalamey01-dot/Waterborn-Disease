import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        // 3-second timer to navigate to Login
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <LinearGradient
            colors={['#005F99', '#4FC3F7', '#E0F7FA']}
            style={styles.splashContainer}
        >
            <StatusBar barStyle="light-content" />
            <View style={styles.logoContainer}>
                <Ionicons name="shield-checkmark" size={100} color="#FFFFFF" />
                <Ionicons
                    name="water"
                    size={50}
                    color="#4FC3F7"
                    style={styles.waterIcon}
                />
            </View>
            <Text style={styles.splashText}>WATERBORNE DISEASE ALERT SYSTEM</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    waterIcon: {
        position: 'absolute',
        top: 25,
    },
    splashText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginHorizontal: 20,
        letterSpacing: 1,
        marginTop: 10,
    },
});
