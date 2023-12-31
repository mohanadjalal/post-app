import axios from "axios";
import { baseUrl } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getItem } from "./storage";
export async function login(email, password) {
  const body = { email, password };
  const config = {
    headers: {
      "Content-Type": "application/json", 
    },
  };

  try {
    const res = await axios.post(`${baseUrl}/login`, body, config);
    console.log('====================================');
    console.log(res.data.data);
    console.log('====================================');
    await AsyncStorage.setItem("user", JSON.stringify(res.data.data));
    await AsyncStorage.setItem("token", res.data.data.token);
  } catch (err) {
    throw err;
  }
}

export async function logout() {
  try {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
  } catch (err) {
    throw err;
  }
}

export async function register(body) {
  const config = {
    headers: {
      "Content-Type": "application/json",  
    },
  };

  try {
    const res = await axios.post(`${baseUrl}/register`, body, config);
    await AsyncStorage.setItem("user", JSON.stringify(res.data.data));
    await AsyncStorage.setItem("token", res.data.data.token);
  } catch (err) {
    throw err;
  }
}

export async function user(){ 
  return  await getItem('user'); 
}

export async function getToken(){ 
  return await getItem('token')

}
