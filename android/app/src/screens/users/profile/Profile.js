import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("posts");

  const user = {
    username: 'arun_badode',
    bio: 'React Native Developer | India',
    followers: 1500,
    following: 345,
    posts: 9,
    reels: 6,
    profilePic: 'https://i.pravatar.cc/300?img=5',
  };

  // Dummy Photos
  const photos = [
    "https://picsum.photos/500/500?1",
    "https://picsum.photos/500/500?2",
    "https://picsum.photos/500/500?3",
    "https://picsum.photos/500/500?4",
    "https://picsum.photos/500/500?5",
    "https://picsum.photos/500/500?6",
    "https://picsum.photos/500/500?7",
    "https://picsum.photos/500/500?8",
    "https://picsum.photos/500/500?9",
  ];

  // Dummy Reels (Video Thumbnails)
  const reels = [
    "https://img.freepik.com/free-vector/play-button-concept-illustration_114360-2526.jpg",
    "https://img.freepik.com/free-vector/video-application-concept-illustration_114360-3982.jpg",
    "https://img.freepik.com/free-photo/modern-video-player-icon-digital-media-playback_23-2150913465.jpg",
    "https://img.freepik.com/free-vector/play-button-gradient-social-media-icon_23-2151086867.jpg",
    "https://img.freepik.com/free-vector/hand-drawn-digital-video-player_23-2148185384.jpg",
    "https://img.freepik.com/free-vector/play-button-neon-sign_23-2148316856.jpg",
  ];

  const DATA = activeTab === "posts" ? photos : reels;

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.headerSection}>
        <Image source={{ uri: user.profilePic }} style={styles.profilePic} />

        <View style={styles.countSection}>
          <View style={styles.countBox}>
            <Text style={styles.count}>{user.posts}</Text>
            <Text style={styles.label}>Posts</Text>
          </View>

          <View style={styles.countBox}>
            <Text style={styles.count}>{user.followers}</Text>
            <Text style={styles.label}>Followers</Text>
          </View>

          <View style={styles.countBox}>
            <Text style={styles.count}>{user.following}</Text>
            <Text style={styles.label}>Following</Text>
          </View>
        </View>
      </View>

      {/* Username & Bio */}
      <View style={styles.bioSection}>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>

      {/* Edit Profile */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Tabs (Posts / Reels) */}
      <View style={styles.tabSection}>
        <TouchableOpacity onPress={() => setActiveTab("posts")}>
          <Icon
            name="grid-outline"
            size={28}
            color={activeTab === "posts" ? "black" : "gray"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab("reels")}>
          <Icon
            name="play-circle-outline"
            size={28}
            color={activeTab === "reels" ? "black" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* Grid */}
      <FlatList
        data={DATA}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postBox}>
            <Image source={{ uri: item }} style={styles.postImage} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },

  profilePic: {
    width: 95,
    height: 95,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#ddd"
  },

  countSection: {
    flexDirection: 'row',
    
  },

  countBox: {
    alignItems: 'center',
    marginHorizontal: 15,
  },

  count: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  label: {
    fontSize: 13,
    color: 'gray',
  },

  bioSection: {
    paddingHorizontal: 20,
  },

  username: {
    fontSize: 18,
    fontWeight: '700',
  },

  bio: {
    fontSize: 15,
    marginTop: 3,
    color: "#444"
  },

  editButton: {
    marginTop: 15,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
  },

  editText: {
    fontSize: 16,
    fontWeight: "600",
  },

  tabSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
  },

  postBox: {
    width: "33%",
    aspectRatio: 1,
    padding: 1,
  },

  postImage: {
    width: "100%",
    height: "100%",
  },
});
