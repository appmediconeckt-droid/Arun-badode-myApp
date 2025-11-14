import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const reelsData = [
  {
    id: '1',
    video: 'https://www.w3schools.com/html/movie.mp4',
    user: 'arun_badode',
    caption: 'My first reel!',
    likes: 120,
    comments: 12,
  },
  {
    id: '2',
    video: 'https://www.w3schools.com/html/movie.mp4',
    user: 'react_native',
    caption: 'React Native power!',
    likes: 230,
    comments: 45,
  },
  {
    id: '3',
    video: 'https://www.w3schools.com/html/movie.mp4',
    user: 'arun_badode',
    caption: 'My first reel!',
    likes: 120,
    comments: 12,
  },
];

export default function ReelsScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.reelContainer}>

        {/* Full screen video */}
        <Video
          source={{ uri: item.video }}
          style={styles.video}
          resizeMode="cover"
          repeat
          paused={currentIndex !== index}
        />

        {/* Bottom text */}
        <View style={styles.bottomInfo}>
          <Text style={styles.username}>@{item.user}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>

        {/* Right side icons */}
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconBox}>
            <Icon name="heart-outline" size={38} color="#fff" />
            <Text style={styles.iconText}>{item.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBox}>
            <Icon name="chatbubble-outline" size={38} color="#fff" />
            <Text style={styles.iconText}>{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBox}>
            <Icon name="share-social-outline" size={38} color="#fff" />
          </TouchableOpacity>
        </View>

      </View>
    );
  };

  return (
    <FlatList
      data={reelsData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToInterval={screenHeight}
      decelerationRate="fast"
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewConfigRef.current}
      getItemLayout={(data, index) => ({
        length: screenHeight,
        offset: screenHeight * index,
        index,
      })}
    />
  );
}

const styles = StyleSheet.create({
  reelContainer: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: 'black',
  },

  video: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },

  bottomInfo: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    width: screenWidth * 0.7,
  },
  username: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  caption: {
    color: '#fff',
    fontSize: 15,
    marginTop: 5,
  },

  rightIcons: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    alignItems: 'center',
  },
  iconBox: {
    marginBottom: 25,
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
});
