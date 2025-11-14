// ChatScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Keyboard,
  Animated,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function ChatScreen({ route }) {
  const { user } = route.params || {
    user: { name: 'User', img: 'https://i.pravatar.cc/150' },
  };

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);

  const flatRef = useRef(null);
  const bottomHeight = useRef(new Animated.Value(0)).current;

  // Time
  const getTime = () => {
    const d = new Date();
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  // Auto scroll
  useEffect(() => {
    setTimeout(() => {
      if (flatRef.current) {
        flatRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    }, 100);
  }, [messages]);

  // Keyboard handler
  useEffect(() => {
    const show = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        Animated.timing(bottomHeight, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }).start();
        setEmojiOpen(false);
        setAttachOpen(false);
      },
    );

    const hide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(bottomHeight, {
          toValue: 0,
          duration: 130,
          useNativeDriver: false,
        }).start();
      },
    );

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  // Send text
  const sendText = () => {
    if (!input.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text: input,
        sender: 'me',
        type: 'text',
        time: getTime(),
      },
    ]);

    setInput('');
  };

  // Emoji click → input me add
  const handleEmoji = e => {
    setInput(prev => prev + e);
  };

  // Send image
  const sendImage = uri => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'me',
        image: uri,
        type: 'image',
        time: getTime(),
      },
    ]);
  };

  // Send video
  const sendVideo = uri => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'me',
        video: uri,
        type: 'video',
        time: getTime(),
      },
    ]);
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, res => {
      const uri = res.assets?.[0]?.uri;
      if (uri) sendImage(uri);
    });
  };

  const pickVideo = () => {
    launchImageLibrary({ mediaType: 'video' }, res => {
      const uri = res.assets?.[0]?.uri;
      if (uri) sendVideo(uri);
    });
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, res => {
      const uri = res.assets?.[0]?.uri;
      if (uri) sendImage(uri);
    });
  };

  // Render message bubble
  const renderItem = ({ item }) => {
    const isMe = item.sender === 'me';
    return (
      <View style={[styles.row, isMe ? { justifyContent: 'flex-end' } : {}]}>
        <View
          style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}
        >
          {item.type === 'text' && <Text style={styles.text}>{item.text}</Text>}

          {item.type === 'image' && (
            <Image source={{ uri: item.image }} style={styles.image} />
          )}

          {item.type === 'video' && (
            <View style={styles.videoThumb}>
              <Icon name="videocam" size={26} color="#fff" />
              <Text style={{ color: '#fff' }}>Video</Text>
            </View>
          )}

          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: user.img }} style={styles.headerImg} />
        <Text style={styles.headerTitle}>{user.name}</Text>

        <View style={{ flex: 1 }} />

        {/* Call icon */}
        <TouchableOpacity style={{ paddingHorizontal: 8 }}>
          <Icon name="call-outline" size={26} color="#222" />
        </TouchableOpacity>

        {/* Video call icon */}
        <TouchableOpacity style={{ paddingHorizontal: 8 }}>
          <Icon name="videocam-outline" size={26} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatRef}
        data={[...messages].reverse()}
        keyExtractor={i => String(i.id)}
        renderItem={renderItem}
        inverted
        contentContainerStyle={{ padding: 10 }}
      />

      {/* Input Row */}
      <Animated.View style={[styles.inputRow, { marginBottom: bottomHeight }]}>
        {/* Emoji Button */}
        <TouchableOpacity
          onPress={() => {
            setEmojiOpen(!emojiOpen);
            setAttachOpen(false);
            Keyboard.dismiss();
          }}
        >
          <Icon
            name="happy-outline"
            size={30}
            color="#444"
            style={{ marginHorizontal: 5 }}
          />
        </TouchableOpacity>

        {/* Attach */}
        <TouchableOpacity
          onPress={() => {
            setAttachOpen(!attachOpen);
            setEmojiOpen(false);
            Keyboard.dismiss();
          }}
        >
          <Icon
            name="add-circle-outline"
            size={30}
            color="#007bff"
            style={{ marginHorizontal: 5 }}
          />
        </TouchableOpacity>

        {/* Input */}
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Message"
          style={styles.input}
          multiline
        />

        <TouchableOpacity onPress={sendText}>
          <Icon name="send" size={26} color="#007bff" />
        </TouchableOpacity>
      </Animated.View>

      {/* Emoji Panel */}
      {emojiOpen && (
        <View style={styles.bottomPanel}>
          <View style={styles.emojiWrap}>
            {[
              '😀',
              '😃',
              '😄',
              '😁',
              '😂',
              '🤣',
              '😍',
              '😘',
              '😎',
              '😭',
              '🤯',
              '🙏',
              '👍',
              '👎',
            ].map(e => (
              <TouchableOpacity
                key={e}
                onPress={() => handleEmoji(e)}
                style={{ padding: 6 }}
              >
                <Text style={{ fontSize: 32 }}>{e}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Attach Panel */}
      {attachOpen && (
        <View style={styles.bottomPanel}>
          <View style={styles.attachRow}>
            <TouchableOpacity style={styles.attachItem} onPress={openCamera}>
              <Icon name="camera-outline" size={30} />
              <Text>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.attachItem} onPress={pickImage}>
              <Icon name="image-outline" size={30} />
              <Text>Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.attachItem} onPress={pickVideo}>
              <Icon name="videocam-outline" size={30} />
              <Text>Video</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerImg: { width: 40, height: 40, borderRadius: 20 },
  headerTitle: { marginLeft: 10, fontSize: 16, fontWeight: '600' },

  // Messages
  row: { flexDirection: 'row', marginVertical: 5 },
  bubble: { padding: 10, borderRadius: 12, maxWidth: '75%' },
  bubbleMe: { backgroundColor: '#dcf8c6' },
  bubbleThem: { backgroundColor: '#fff' },
  text: { fontSize: 16 },
  time: { fontSize: 10, color: '#333', marginTop: 6, alignSelf: 'flex-end' },
  image: { width: 180, height: 180, borderRadius: 10 },

  videoThumb: {
    width: 180,
    height: 180,
    backgroundColor: '#0007',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Input
  inputRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    marginHorizontal: 8,
    fontSize: 15,
  },

  // Bottom Sheet Panels
  bottomPanel: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 6,
  },

  emojiWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },

  attachRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  attachItem: {
    alignItems: 'center',
  },
});
