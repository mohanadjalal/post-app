// CommentFooter.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

const CommentHeader = ({ onAddComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <View style={styles.footer}>
      <TextInput
        style={styles.input}
        placeholder="Enter your comment..."
        value={newComment}
        onChangeText={(text) => setNewComment(text)}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleAddComment}>
        <Text style={styles.buttonText}>Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    backgroundColor: "#e4f1f7",
    padding: 10,
  },
  input: {
    height: 60,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    flexGrow: 6,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    justifyContent: "center",
    height: 60,
    flexGrow: 1,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default CommentHeader;
