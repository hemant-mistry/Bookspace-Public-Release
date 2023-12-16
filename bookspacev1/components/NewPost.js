import {firebase} from '@react-native-firebase/firestore';
import {keyboard} from '@testing-library/user-event/dist/keyboard';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from "@react-navigation/native";

const NewPost = () => {
  const databaseConnection = firebase.firestore().collection('allPosts');
  const [genre, setGenre] = useState('');
  const [post, setPost] = useState('');

  const addNewPost = () => {
    console.log('Inside add new post function');
    const data = {
      genre: genre,
      posts: post,
    };

    databaseConnection
      .add(data)
      .then(() => {
        //release the genre and post fields.
        setGenre('');
        setPost('');

        //release the keyboard
        Keyboard.dismiss();
      })
      .catch(error => {
        //show an alert in case of error
        Alert(error);
      });
  };

  const navigation = useNavigation();
    const handleBack = () => {
        navigation.navigate("HomePage");
      };
  return (
   
    <KeyboardAwareScrollView
    
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
       <View>
       <Pressable style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Bookspace</Text>
        <Text style={styles.sectionSubtitle}>
          With each keystroke, conjure realms of wonder, where prose dances like
          whispers and
          <Text style={styles.sectionSubtitleSpan}>
            {' '}
            sentences bloom into stories{''}
          </Text>{' '}
          —a symphony of creation echoing through the vast expanse of the
          literary cosmos. {'\n\n'}
        </Text>
        <View style={styles.centeredContainer}>
          <View style={styles.newPostContainer}>
            <View style={styles.newPostBookContainer}>
              <Text style={styles.newPostContent}>Book:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your book name"
                keyboardType="default"
                onChangeText={text => setGenre(text)}
                value={genre}
              />
            </View>
            <View style={styles.newPostQuoteContainer}>
              <Text style={styles.newPostContent}>Quote:</Text>
              <TextInput
                style={styles.inputQuote}
                placeholder="Enter your quote..."
                keyboardType="default"
                multiline={true}
                numberOfLines={4}
                onChangeText={text => setPost(text)}
                value={post}
              />
            </View>
            <Pressable style={styles.submitButton} onPress={addNewPost}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingTop: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    borderColor: '#424549',
    backgroundColor: '#424549',
    borderRadius: 14,
  },

  inputQuote: {
    height: 70,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    borderColor: '#424549',
    backgroundColor: '#424549',
    borderRadius: 14,
  },
  text: {
    color: 'white',
    fontSize: 24,
    paddingHorizontal: 20,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  sectionSubtitleSpan: {
    color: '#7289DA',
    lineHeight: 15,
    paddingHorizontal: 20,
  },
  newPostContainer: {
    padding: 25,
    backgroundColor: '#282B30',
    borderRadius: 20,
    width: '80%',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newPostContent: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#7289DA',
    height: 28,
    width: 77,
    textAlign: 'center',
    marginTop: 10,
    borderRadius: 10,
    alignSelf: 'center', // Center the button horizontally
  },
  submitButtonText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 5,
    fontWeight: 'bold',
  },
  backButton:{
    backgroundColor: '#7289DA',
    height: 28,
    width: 77,
    textAlign: 'center',
    marginTop: 10,
    borderRadius: 10,
    marginLeft:20
  },
  backButtonText:{
    textAlign: 'center',
    color: 'white',
    marginTop: 5,
    fontWeight: 'bold',
  }
});

export default NewPost;
