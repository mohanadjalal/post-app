//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const CommentItem  = ({user}) => {
   
    const [owner , setOwner] = useState(null)
    const comment = { text : 'this is the text of comments '  , id:1  } 
    return (
        <View style={styles.container}>
            <Text>{owner?.name}</Text>
            <Text>{comment.text}</Text>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default CommentItem;
