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
  await fetchAllPosts();
  const posts = await AsyncStorage.getItem("posts");
  return JSON.parse(posts);
}

export async function getPostById(id) {
  const config = await getConfig();
  const endpoint = baseUrl + "/posts/" + id;
  return await axios.get(endpoint, config);
}

export async function getUserById(id) {
  const config = await getConfig();
  const endpoint = baseUrl + "/users/" + id;
  const res = await axios.get(endpoint, config);
  return res.data.data;
}

export async function deletePost(id) {
  const config = await getConfig();
  const endpoint = baseUrl + "/posts/" + id;
  await axios.delete(endpoint, config);
}

export async function updatePost(id, body) {
  const config = await getConfig();
  const endpoint = baseUrl + "/users/" + id;
  await axios.patch(endpoint, body, config);
}
