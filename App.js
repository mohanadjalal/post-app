import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Login from "./app/auth/login";
import Register from "./app/auth/register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import Home from "./app/pages/home";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
 

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" >
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="home" component={Home} 
        options={{
            headerLeft: () => <></> 
        }}  />
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
});
