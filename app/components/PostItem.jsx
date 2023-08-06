//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const PostItem = ({post  , handleOnPress  }) => {
   
    return (
        <TouchableOpacity style={styles.container} onPress={()=>handleOnPress(post)}>
            <Text style={{fontSize:24}}>{post.title}</Text>
            <Text>{post.body}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
       borderStyle: 'solid' , 
       borderWidth : 0, 
       borderBottomWidth:1 , 
       paddingHorizontal : 20 , 
       paddingBottom:10 , 

    },
});

//make this component available to the app
export default PostItem;
