import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
} from "react-native";

import iconImage from "../../assets/profile-icon.png";
import btnImage from "../../assets/profile.webp";
import { getItem } from "../utils/storage";
import { logout } from "../utils/auth";
import { useNavigation } from "@react-navigation/native";

const HeaderRight = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    getItem("user").then((res) => setUser(res));
  }, []);

  const handleLogout = () => {
    logout()
      .then(() => {
        setModalVisible(false);
        navigation.navigate("login");
      })
      .catch((err) => {
        alert("Some Error occurred\n" + err.message);
        console.error(err);
      });
  };

  const profile=()=> { 
    setModalVisible(false);
    navigation.navigate('profile')
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.container}
      >
        <Image source={iconImage} style={styles.icon} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{user?.name}</Text>

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.textStyle}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={ profile}
            >
              <Image source={btnImage} style={styles.btnImage} />
              <Text style={styles.textStyle}>Profile</Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Back</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: "92%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    padding: 10,
    width: 200,
    marginBottom: 10,
    display:'flex' , 
    flexDirection:'row',
    alignItems: "center" ,
    justifyContent:'center',
    alignSelf:"center"
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  btnImage:{
    width: 30 , 
    height:30,
    borderRadius:30,
    marginHorizontal:5
  }
});

export default HeaderRight;
