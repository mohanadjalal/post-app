// Import liraries
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { logout } from "../utils/auth";

// Create a component
const Home = ({ route, navigation }) => {
  const handleLogout = () => {
    logout()
      .then(() => navigation.navigate("login"))
      .catch((err) => {
        alert("Some Error occurred\n" + err.message);
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

// Define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// Make this component available to the app
export default Home;
