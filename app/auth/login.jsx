import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../utils/auth";
import { getItem } from "../utils/storage";

const Login = ({ route, navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.getItem("user").then((value) => {
        if (value) navigation.navigate("feed");
        setLoading(false);
      });
      console.log("login Screen is focused, refreshing data...");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getItem("user").then((value) => {
      if (value) navigation.navigate("feed");
    });
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handelLogin = () => {
    login(email, password)
      .then(() => navigation.navigate("feed"))
      .catch((err) => {
        alert("Some Error occurred\n" + err.message);
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handelLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("register")}
          >
            <Text style={styles.loginButtonText}>Create New Account </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#2c3e50",
  },
});

export default Login;
