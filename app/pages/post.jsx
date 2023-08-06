// import libraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserById } from "../utils/httpRequest";
import { getItem } from "../utils/storage";

// create a component
function Post({ route, navigation }) {
  const { user_id, title, body, created_at, updated_at } = route.params.post;
  const [owner, setOwner] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser = async () => {
     const res = await  getUserById(user_id) ;
    setOwner(res) ; 
    const result  = await getItem('user') ; 
    setUser(result)
      console.log('====================================');
      console.log(result);
      console.log('====================================');
    };
    fetchUser();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}> {owner?.name} </Text>
        <Text style={styles.email}> {owner?.email} </Text>
        <Text style={styles.postTitle}>{title}</Text>
        <Text style={styles.postBody}>{body}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.dateText}> {created_at}</Text>
      </View>
    </SafeAreaView>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "start",
    backgroundColor: "#1abc9c", // A cool green color
    padding: 20,
  },
  title: {
    fontSize: 32, // Larger font size for the title
    color: "#fff",
    marginBottom: 10,
    marginLeft: 0,
  },
  postTitle: {
    fontSize: 24, // Slightly larger font size for the post title
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  postBody: {
    fontSize: 18, // A good readable font size for the post body
    color: "#fff",
    marginBottom: 20, // Increased spacing between post title and body
    textAlign: "justify", // Align the text in the center
  },
  dateText: {
    fontSize: 12, // Smaller font size for the date text
    color: "#fff",
    textAlign: "right",
    opacity: 0.7, // Reduced opacity for a subtle effect
  },
  footer: {
    height: 20,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  email: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
});

// make this component available to the app
export default Post;
