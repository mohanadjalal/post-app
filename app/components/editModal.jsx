//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Modal, TextInput, Button } from "react-native";

// create a component
const EditModal = ({ isModalVisible, submit, hideModal, body, title }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newBody, setNewBody] = useState(body);

  const edit = () =>{ 
    if(!newTitle || !newTitle.trim()) alert('Title is required');
    else if( !newBody || !newBody.trim()) alert('Body us required');
    else { 
        submit({title: newTitle , body : newBody });
    }
  }
  return (
    <Modal visible={isModalVisible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Post</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <TextInput
            style={styles.textarea}
            placeholder="Body"
            value={newBody }
            onChangeText={setNewBody}
            multiline
          />
          <View style={styles.modalButtons}>
            <Button title="Cancel" onPress={hideModal} color="gray" />
            <Button title="Add" onPress={edit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
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

//make this component available to the app
export default EditModal;
