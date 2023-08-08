//import liraries
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getItem } from "../utils/storage";

// create a component
const CommentItem = ({ index, comment, onChange }) => {
  const [owner, setOwner] = useState(false);
  useEffect(() => {
    getItem("user").then((res) => setOwner(comment.user.id === res.id));
  }, []);

  const onLongPress = () => {
    if (owner) {
      Alert.alert(
        "Delete comment",
        "Are you sure you want to delete the comment  ? ",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
          },
          {
            text: "Delete",
            onPress: () =>
              delComment(comment.id)
                .then(() => onChange())
                .catch((err) => alert(err)),
          },
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert(
        comment.user.name,
        `by:  ${comment.user.email} \n at: ${comment.created_at}`,
        [{ text: "Ok" }]
      );
    }
  };
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      style={[
        styles.container,
        index % 2 === 0 ? styles.evenItem : styles.oddItem,
      ]}
    >
      <Text style={styles.userName}>{comment.user?.name}</Text>
      <Text style={styles.commentText}>{comment.text}</Text>
      <Text>{comment.created_at}</Text>
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
