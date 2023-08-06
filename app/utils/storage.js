import AsyncStorage from "@react-native-async-storage/async-storage";


export  async function getItem(key) { 
    const res = await  AsyncStorage.getItem(key); 
 
    return JSON.parse(res) ; 

}

export function setItem(key , date)  { 
    AsyncStorage.setItem(key , JSON.stringify(date))
}
