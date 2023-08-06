import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import PostItem from './PostItem';
import { useNavigation } from '@react-navigation/native';

const PostList = ({ posts  , handleOnRefresh}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
const navigation = useNavigation();
const onItemPress = (post) =>  { 
  navigation.navigate('posts' , { 
    post : post
  } )
}
  return (
    <View style={styles.container}>
      <FlatList 
        contentContainerStyle={styles.list}
        data={posts}
        renderItem={({ item }) => <PostItem post={item} handleOnPress={onItemPress} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleOnRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
});

export default PostList;
