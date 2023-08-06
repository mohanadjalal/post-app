// Import liraries
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import { logout } from "../utils/auth";
import { fetchAllPosts, getALlPosts } from "../utils/postRequests";
import PostList from "../components/PostList";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create a component
const Home = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const handleLogout = () => {
    // alksjd alskdj
    logout()
      .then(() => navigation.navigate("login"))
      .catch((err) => {
        alert("Some Error occurred\n" + err.message);
        console.error(err);
      });
  };
  const getPosts = async () => {
    try {
      const res = await getALlPosts();
      setPosts(res);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  


  useEffect(() => {
    getPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <PostList posts={posts} handleOnRefresh={getPosts}/>
    </SafeAreaView>
  );
};

// Define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Make this component available to the app
export default Home;
