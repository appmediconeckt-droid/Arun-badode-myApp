import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './android/app/src/screens/leyout/LoginScreen.js';
import SignupScreen from './android/app/src/screens/leyout/SignupScreen.js';
import UserDashboard from './android/app/src/screens/users/UserDashboard.js';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';
import AddPostScreen from './android/app/src/screens/users/posts/AddPostScreen.js';
import SearchScreen from './android/app/src/screens/users/Search/SearchScreen.js';
import ChatListScreen from './android/app/src/screens/users/chat/ChatListScreen.js';
import ChatScreen from './android/app/src/screens/users/chat/ChatScreen.js';
import ProfileScreen from './android/app/src/screens/users/profile/Profile.js';
import EditProfile from './android/app/src/screens/users/profile/EditProfile.js';
import ReelsScreen from './android/app/src/screens/users/reels/ReelsScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Dashboard"
          component={UserDashboard}
          options={({ navigation }) => ({
            title: 'Arun Badode',
            headerBackVisible: false,
            headerRight: () => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 0,
                }}
              >
                {/* Payment Icon */}
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <Icon name="card-outline" size={26} />
                </TouchableOpacity>

                {/* Notification Icon */}
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <Icon name="notifications-outline" size={28} />
                </TouchableOpacity>

                {/* Chat Icon */}
                <TouchableOpacity style={{ marginLeft: 10 }}
                  onPress={() => navigation.navigate('ChatList')}
                >
                  <Icon name="chatbubble-outline" size={28} />
                </TouchableOpacity>
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ title: 'Search' }}
        />

        <Stack.Screen name="AddPost" component={AddPostScreen} />

        <Stack.Screen
          name="ChatList"
          component={ChatListScreen}
          options={{ title: 'Chats' }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ReelsScreen"
          component={ReelsScreen}
          options={{ title: 'Reels' }}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
