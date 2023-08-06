import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import PostItem from './PostItem';

const PostList = ({ posts  , handleOnRefresh}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={posts}
        renderItem={({ item }) => <PostItem post={item} />}
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
