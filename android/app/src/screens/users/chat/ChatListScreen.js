import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function ChatListScreen({ navigation }) {

  const users = [
    { id: 1, name: "Arun", img: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Rohan", img: "https://i.pravatar.cc/150?img=5" },
    { id: 3, name: "Sneha", img: "https://i.pravatar.cc/150?img=10" },
    { id: 4, name: "Priya", img: "https://i.pravatar.cc/150?img=8" },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.userRow}
            onPress={() => navigation.navigate('ChatScreen', { user: item })}
          >
            <Image source={{ uri: item.img }} style={styles.userImg} />
            <Text style={styles.userName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  userImg: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  userName: {
    fontSize: 20,
    marginLeft: 15,
  },
});
