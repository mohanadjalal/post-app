// import libraries
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getUserById,
  deletePost,
  fetchAllPosts,
  updatePost,
  getPostById,
  getCommentsByPostId,
  postComment,
} from "../utils/httpRequest";
import { getItem } from "../utils/storage";
import Btn from "../components/common/Btn";
import EditModal from "../components/editModal";
import CommentList from "../components/commentList";

function Post({ route, navigation }) {
  const { user_id, id } = route.params.post;
  const [owner, setOwner] = useState(null);
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchUser = async () => {
      await getPost();
      const res = await getUserById(user_id);
      setOwner(res);
      const result = await getItem("user");
      setUser(result);
    };
    fetchUser();
  }, []);

  const getPost = () => {
    getPostById(id).then((res) => {
      setPost(res);
      getCommentsByPostId(id)
        .then((res) => setComments(res))
        .catch((err) => alert(err));
    });
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
      getPost(id);
    });
  };

  const addComment = (text) => {
    postComment({ text, post_id: id }).then((res) => getPost())
    .catch(err=>alert(err));
  };
  if (post)
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View>
            <Text style={styles.title}> {owner?.name} </Text>
            <Text style={styles.email}> {owner?.email} </Text>
            <Text style={styles.postTitle}>{post?.title}</Text>
            <Text style={styles.postBody}>{post?.body}  </Text>
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
        </ScrollView>
        <CommentList comments={comments} onAddComment={addComment} onChange={getPost} />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "start",
    backgroundColor: "#1abc9c",
  },
  scrollView: {
    marginBottom: 40,
    paddingHorizontal: 20,
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
    textAlign: "center",
  },
  postBody: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    textAlign: "auto",
  },
  dateText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "right",
    opacity: 0.7,
  },
  footer: {},
  email: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  btnGroup: {
    width: 120,
    position: "absolute",

    top: 0,
    right: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "",
  },
  deleteBtnPressed: {
    backgroundColor: "#FF5733",
    paddingHorizontal: 5,
    margin: 5,
  },
  deleteBtn: {
    backgroundColor: "#F52B00",
    margin: 5,
    paddingHorizontal: 5,
  },
  editBtnPressed: {
    backgroundColor: "#78A9ED",
    paddingHorizontal: 5,
    margin: 5,
  },
  editBtn: {
    backgroundColor: "#3D8EFD",
    paddingHorizontal: 5,
    margin: 5,
  },
});

export default Post;
