//import liraries
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

// create a component
const CommentItem = ({ index, comment }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        index % 2 === 0 ? styles.evenItem : styles.oddItem,
      ]}
    >
      <Text style={styles.userName}>{comment.user?.name}</Text>
      <Text style={styles.commentText}>{comment.text}</Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  evenItem: {
    backgroundColor: "#3498db",
  },
  oddItem: {
    backgroundColor: "#27ae60",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  commentText: {
    fontSize: 14,
    color: "#ffffff",
  },
});

//make this component available to the app
export default CommentItem;
