import { NavigationContainer } from "@react-navigation/native";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import Login from "./app/auth/login";
import Register from "./app/auth/register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/pages/home";
import HeaderRight from "./app/components/HeaderRight";
import HeaderLeft from "./app/components/HeaderLeft";
import { useState } from "react";
import { createPost, fetchAllPosts } from "./app/utils/httpRequest";
import Post from "./app/pages/post";
import Profile from "./app/pages/profile";

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const Stack = createNativeStackNavigator();
  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const addPost = () => {
    if (!title || !title.trim()) {
      alert("Title is required!");
    } else if (!body || !body.trim()) {
      alert("Body is required!");
    } else {
      createPost({ title, body }).then((res) => {
        hideModal();
        fetchAllPosts();
        setTitle("");
        setBody("");
      });
    }
  };

  return (
    <NavigationContainer>
      <Modal visible={isModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Post</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.textarea}
              placeholder="Body"
              value={body}
              onChangeText={setBody}
              multiline
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={hideModal} color="gray" />
              <Button title="Add" onPress={addPost} />
            </View>
          </View>
        </View>
      </Modal>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="feed"
          component={Home}
          options={{
            headerLeft: () => <HeaderLeft onPress={showModal} />,
            headerTitle: () => <Text style={styles.title}>Feed</Text>,
            headerRight: () => <HeaderRight />,
            headerTitleAlign: "center",
            headerBackVisible: false, // This remove the back arrow
          }}
        />

        <Stack.Screen
          name="posts"
          component={Post}
          options={{
            headerShown: true,
            title: "",
            headerTitle: () => <Text style={styles.title}></Text>,
            headerRight: () => <HeaderRight />,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{
            headerShown: true,
            title: "",
            headerTitle: () => <Text style={styles.title}></Text>,
            headerRight: () => <HeaderRight />,
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  spinnerTextStyle: {
    position: "absolute",
    top: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
