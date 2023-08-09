//import liraries
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CommentItem from "./commentItem";
import CommentFooter from "./common/commentListHeader";

// create a component
const CommentList = ({ comments ,  onAddComment , onChange }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentItem comment={item} onChange={onChange} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={() => (
          <CommentFooter onAddComment={onAddComment}  />
        )}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    
    backgroundColor: "#b1e4fc",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopStyle: "solid",
    borderTopColor: "#70bde0",
    borderTopWidth: 3,
    width:'100%',
    height:"45%"
  },
  headerText: {
    color: "#333",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  separator: {
    height: 8,
  },
});

//make this component available to the app
export default CommentList;
