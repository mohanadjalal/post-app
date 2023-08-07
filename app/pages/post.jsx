// import libraries
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserById, deletePost, fetchAllPosts } from "../utils/httpRequest";
import { getItem } from "../utils/storage";
import Btn from "../components/common/Btn";

function Post({ route, navigation }) {
  const { user_id, title, body, created_at, updated_at, id } =
    route.params.post;
  const [owner, setOwner] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser = async () => {
      const res = await getUserById(user_id);
      setOwner(res);
      const result = await getItem("user");
      setUser(result);
    };
    fetchUser();
  }, []);
  const isOwner = () => user?.id === owner?.id;

  const deleteThisPost = () => {
    deletePost(id).then((res) => {
      fetchAllPosts().then(() => navigation.navigate("home"));
    });
  };
  const createTwoButtonAlert = () =>
    Alert.alert("Delete Post", "Are you sure ? ", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: deleteThisPost },
    ]);

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

      {isOwner() ? (
        <View style={styles.btnGroup}>
          <Btn
            onPress={createTwoButtonAlert}
            text="DELETE"
            style={styles.deleteBtn}
            pressedStyle={styles.deleteBtnPressed}
            textStyle={{
              color: "white",
            }}
          />
          <Btn
            onPress={() => alert("edit btn ")}
            text="EDIT"
            style={styles.editBtn}
            pressedStyle={styles.editBtnPressed}
            textStyle={{
              color: "black",
            }}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "start",
    backgroundColor: "#1abc9c",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 10,
    marginLeft: 0,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  postBody: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    textAlign: "justify",
  },
  dateText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "right",
    opacity: 0.7,
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
  btnGroup: {
    width: 80,
    position: "absolute",
    top: 50,
    right: 5,
  },
  deleteBtnPressed: {
    backgroundColor: "#FF5733",
    margin: 5,
  },
  deleteBtn: {
    backgroundColor: "#F52B00",
    margin: 5,
  },
  editBtnPressed: {
    backgroundColor: "#78A9ED",
    margin: 5,
  },
  editBtn: {
    backgroundColor: "#3D8EFD",
    margin: 5,
  },
});

export default Post;
