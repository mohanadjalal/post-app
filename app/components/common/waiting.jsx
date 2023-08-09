//import liraries
 
import React, { Component } from 'react';
import { View, Text, StyleSheet  ,ActivityIndicator } from 'react-native';

// create a component
const Waiting = () => {
    return (
        <View  style={{
            flex:1 , 
            justifyContent:"center" ,
            alignItems:'center'
        }}>
         <ActivityIndicator size="large" color="#196EE4" />
        </View>
    );
};
 

 
export default Waiting;
