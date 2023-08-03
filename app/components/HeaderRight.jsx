//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import iconImage from '../../assets/profile-icon.png';

// create a component
const HeaderRight = () => {

    const onPress = ()=> { 
        alert('hi')
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image  source={iconImage} style={styles.icon} />   
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
       
    },
    icon : { 
        width:40 , 
        height :40 , 
    }
});

//make this component available to the app
export default HeaderRight;
