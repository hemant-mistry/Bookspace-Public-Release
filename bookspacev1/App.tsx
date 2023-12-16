import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./components/HomePage";
import NewPost from "./components/NewPost";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import firestore from "@react-native-firebase/firestore"
import { useNavigation } from "react-router-dom";

const Stack = createStackNavigator();

const App = () => {
  
  StatusBar.setBarStyle("light-content"); // Set the status bar text color to light
  StatusBar.setBackgroundColor("#000000"); // Set the status bar background color to black

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [allPosts, setallPosts] = useState([]); // Initial empty array of users


  useEffect(() => {
    const subscriber = firestore()
      .collection('allPosts')
      .onSnapshot(querySnapshot => {
        const allPosts = [];
  
        querySnapshot.forEach(documentSnapshot => {
          allPosts.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setallPosts(allPosts);
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  if(loading){
    return <ActivityIndicator/>
   } 

    
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1E1E1E", // Set the background color of the header to black
          },
          headerTintColor: "#FFFFFF", // Set the text color of the header to white
          headerTitleStyle: {
            color: "#FFFFFF", // Set the color of the header title to white
          },
        
        }}
      >
        <Stack.Screen
          name="HomePage"
          options={{ headerTitle: "Home", headerShown: false }}
        >
          {(props) => <HomePage {...props} allPosts={allPosts} />}
        </Stack.Screen>
        <Stack.Screen
          name="NewPost"
          component={NewPost}
          options={{ headerTitle: "New Post", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
