import axios from "axios";
import { baseUrl } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getConfig() {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
}

export async function fetchAllPosts() {
  const config = await getConfig();
  const endpoint = baseUrl + "/posts";
  const res = await axios.get(endpoint, config);
  const posts = JSON.stringify(res.data.data);
  await AsyncStorage.setItem("posts", posts);
}

export async function createPost(body) {
  const config = await getConfig();
  const endpoint = baseUrl + "/posts";
  return axios.post(endpoint, body, config);
}

export async function getALlPosts() {
  const posts = await AsyncStorage.getItem("posts");
 
  return JSON.parse(posts);
}
