import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const users = [
    { id: 1, name: "Arun", img: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Rohan", img: "https://i.pravatar.cc/150?img=5" },
    { id: 3, name: "Sneha", img: "https://i.pravatar.cc/150?img=10" },
    { id: 4, name: "Vijay", img: "https://i.pravatar.cc/150?img=8" },
    { id: 5, name: "Mahesh", img: "https://i.pravatar.cc/150?img=12" },
  ];

  // Filter Logic
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBox}
        placeholder="Search users..."
        value={query}
        onChangeText={text => setQuery(text)}
        autoFocus={true}      // Keyboard automatically open
      />

      {/* USERS LIST */}
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userRow}>
            <Image source={{ uri: item.img }} style={styles.userImg} />
            <Text style={styles.userName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  searchBox: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 20,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  userImg: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  userName: {
    fontSize: 18,
    marginLeft: 15,
  },
});
