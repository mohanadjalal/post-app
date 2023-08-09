//import liraries
import React, { Component, useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, Image } from "react-native";
import {} from "react-native-safe-area-context";
import { user } from "../utils/auth";
import { getUserById } from "../utils/httpRequest";

import avatar from "../../assets/avatar.webp";
import PostList from "../components/PostList";

// create a component
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const getUser = () => {
    user()
      .then(async (res) => {
        try {
          const u = await getUserById(res.id);
          setProfile(u);
        } catch (err) {
          alert(err.message);
        }
      })
      .catch((err) => alert(err.message));
  };
  useEffect(() => {
    getUser();
  }, []);

  if (profile)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.avatar} source={avatar} />
          <View style={styles.info}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.email}>{profile.email}</Text>
          </View>
        </View>
        <PostList handleOnRefresh={getUser} posts={profile.posts} />
      </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 5,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "gray",
  },
  name: {
    fontSize: 30,
  },
  email: {
    fontWeight: "bold",
    color: "gray",
  },
});

//make this component available to the app
export default Profile;
