import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import { getALlPosts } from "../utils/httpRequest";
import PostList from "../components/PostList";

const Home = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

 
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
      <PostList posts={posts} handleOnRefresh={getPosts} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
