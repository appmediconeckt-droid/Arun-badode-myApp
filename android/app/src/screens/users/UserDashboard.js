import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UserDashboard({ navigation }) {
  // Dummy Followed Users Posts
  const posts = [
    {
      id: 1,
      username: 'Arun',
      userImg: 'https://i.pravatar.cc/150?img=8',
      postImg: 'https://picsum.photos/600/800?random=1',
    },
    {
      id: 2,
      username: 'Rohan',
      userImg: 'https://i.pravatar.cc/150?img=9',
      postImg: 'https://picsum.photos/600/800?random=2',
    },
    {
      id: 3,
      username: 'Sneha',
      userImg: 'https://i.pravatar.cc/150?img=10',
      postImg: 'https://picsum.photos/600/800?random=3',
    }, 
  ];

  return (
    <View style={styles.container}>
      {/* STORIES BAR */}
      <View style={styles.storyRow}>
        <View style={styles.storyItem}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
            style={styles.storyImage}
          />
          <Text style={styles.storyName}>You</Text>
        </View>

        <View style={styles.storyItem}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=2' }}
            style={styles.storyImage}
          />
          <Text style={styles.storyName}>Arun</Text>
        </View>

        <View style={styles.storyItem}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
            style={styles.storyImage}
          />
          <Text style={styles.storyName}>User</Text>
        </View>

        <View style={styles.storyItem}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=4' }}
            style={styles.storyImage}
          />
          <Text style={styles.storyName}>Friend</Text>
        </View>
      </View>

      {/* MAIN FEED (POSTS) */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {posts.map(item => (
          <View key={item.id} style={styles.postBox}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <Image
                source={{ uri: item.userImg }}
                style={styles.postUserImg}
              />
              <Text style={styles.postUsername}>{item.username}</Text>
            </View>

            {/* Post Image */}
            <Image source={{ uri: item.postImg }} style={styles.postImage} />

            {/* Post Actions */}
            <View style={styles.actionRow}>
              <TouchableOpacity>
                <Icon name="heart-outline" size={28} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Icon
                  name="chatbubble-outline"
                  size={28}
                  style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Icon
                  name="share-social-outline"
                  size={28}
                  style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Icon name="home" size={28} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <Icon name="search" size={28} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AddPost')}>
          <Icon name="add-circle" size={28} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ReelsScreen')}>
          <Icon name="videocam-outline" size={28} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="person" size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ==========================
// STYLES
// ==========================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  storyRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ff004f',
  },
  storyName: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },

  postBox: {
    marginBottom: 20,
  },

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  postUserImg: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },

  postUsername: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },

  postImage: {
    width: '100%',
    height: 400,
  },

  actionRow: {
    flexDirection: 'row',
    padding: 10,
  },

  bottomNav: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
