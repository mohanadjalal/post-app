// import libraries
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getUserById,
  deletePost,
  fetchAllPosts,
  updatePost,
  getPostById,
} from "../utils/httpRequest";
import { getItem } from "../utils/storage";
import Btn from "../components/common/Btn";
import EditModal from "../components/editModal";

function Post({ route, navigation }) {
  const { user_id, id } = route.params.post;
  const [owner, setOwner] = useState(null);
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUser = async () => {
      setPost(route.params.post);
      const res = await getUserById(user_id);
      setOwner(res);
      const result = await getItem("user");
      setUser(result);
    };
    fetchUser();
  }, []);

  const getPost = (id) => {
    getPostById(id).then((res) => setPost(res));
  };
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

  const hideModal = () => {
    setShowModal(false);
  };
  const update = (newPost) => {
    updatePost(id, newPost).then((res) => {
      hideModal();
      getPost(id)
    });
  };
  if (post)
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}> {owner?.name} </Text>
          <Text style={styles.email}> {owner?.email} </Text>
          <Text style={styles.postTitle}>{post?.title}</Text>
          <Text style={styles.postBody}>{post?.body}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.dateText}> {post?.created_at}</Text>
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
              onPress={() => setShowModal(true)}
              text="EDIT"
              style={styles.editBtn}
              pressedStyle={styles.editBtnPressed}
              textStyle={{
                color: "black",
              }}
            />
          </View>
        ) : null}

        <EditModal
          isModalVisible={showModal}
          hideModal={hideModal}
          submit={update}
          title={post?.title}
          body={post?.body}
        />
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
