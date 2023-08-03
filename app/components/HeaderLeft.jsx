//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const HeaderLeft = ({onPress}) => {
    return (
       <TouchableOpacity onPress={onPress}>
        <Text>Post</Text>
       </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
   
});

//make this component available to the app
export default HeaderLeft;
