import axios from 'axios';
import { baseUrl } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getAllPosts() { 
   const token   = await  AsyncStorage.getItem('token');
   const config = {
     headers: {
       "Content-Type": "application/json", 
       "Authorization" : 'Bearer ' + token   
     },
   };
   const endpoint  = baseUrl + '/posts' ; 
   console.log('==============tocken======================');
   console.log(config);
   console.log('====================================');

   return  axios.get(endpoint ,config);



}