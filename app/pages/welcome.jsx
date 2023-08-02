//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Welcome = (route, navigation) => {
    const [user, setUser] = useState(null);
    AsyncStorage.getItem('user')
    .then(res=> { 
        if(res)  navigation.navigate('home');
        else   navigation.navigate('login')
    })
    return (
        <View style={styles.container}>
            <Text>POST APP </Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default Welcome;
