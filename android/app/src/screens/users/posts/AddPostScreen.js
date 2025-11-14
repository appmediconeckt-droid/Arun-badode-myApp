import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function AddPostScreen() {
  const [media, setMedia] = useState(null);

  // 🔥 ASK PERMISSIONS (Android Only)
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const camera = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );

        const gallery =
          Platform.Version >= 33
            ? await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
              )
            : await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
              );

        if (camera !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission denied");
        }

        if (gallery !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Gallery permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  // 📌 OPEN GALLERY
  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        quality: 1,
      },
      (response) => {
        if (!response.didCancel && response.assets?.length > 0) {
          setMedia(response.assets[0]);
        } else {
          console.log("Gallery Error:", response.errorMessage);
        }
      }
    );
  };

  // 📌 OPEN CAMERA
  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'mixed',
        quality: 1,
      },
      (response) => {
        if (!response.didCancel && response.assets?.length > 0) {
          setMedia(response.assets[0]);
        } else {
          console.log("Camera Error:", response.errorMessage);
        }
      }
    );
  };

  return (
    <View style={styles.container}>

      {media ? (
        <Image source={{ uri: media.uri }} style={styles.preview} />
      ) : (
        <View style={styles.emptyBox}>
          <Text style={{ fontSize: 18, color: "#888" }}>No Media Selected</Text>
        </View>
      )}

      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={openGallery}>
          <Icon name="image-outline" size={30} color="#fff" />
          <Text style={styles.btnText}>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={openCamera}>
          <Icon name="camera-outline" size={30} color="#fff" />
          <Text style={styles.btnText}>Camera</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.uploadBtn}>
        <Text style={{ color: "#fff", fontSize: 20 }}>Upload Post</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },

  emptyBox: {
    width: "100%",
    height: 380,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  preview: {
    width: "100%",
    height: 380,
    borderRadius: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  btn: {
    width: "48%",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: { color: "#fff", fontSize: 18, marginLeft: 10 },

  uploadBtn: {
    backgroundColor: "#00c853",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
});
