import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar,useColorScheme, ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import firestore from "@react-native-firebase/firestore"


const HomePage = ({allPosts}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  
  const navigation = useNavigation();
    const handleDumpItPress = () => {
        navigation.navigate("NewPost");
      };

    
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Today's tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Bookspace</Text>
          <Text style={styles.sectionSubtitle}>
            Join our community of literary enthusiasts and{" "}
            <Text style={styles.sectionSubtitleSpan}>
              share the magic of words!{" "}
            </Text>
            Whether it's a captivating quote from your favorite novel, a
            thought-provoking line from a classic, or your own poetic musings,
            our platform is the perfect space to post and appreciate the beauty
            of language. Let's bring the world of words together, one quote at
            a time.
          </Text>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.sectionButton} onPress={handleDumpItPress}>
              <Text style={styles.sectionButtonText}>DUMP IT!</Text>
            </Pressable>
          </View>
          <FlatList
      data={allPosts}
      renderItem={({ item }) => (

          <View style={styles.quoteSectionContainer}>
            <View style={styles.quoteSection}>
              <Text style={styles.quoteHeader}>
                <Text style={styles.quoteHeaderBook}>Book:</Text>{" "}
                <Text style={styles.quoteHeaderBookName}>{item.genre}</Text>
              </Text>
              <Text style={styles.quoteContent}>
                {item.posts}
              </Text>
            </View>
            {/* More quote sections */}
          </View>
      )}/>
          <View style={styles.quoteSectionContainer}>
            <View style={styles.quoteSection}>
              <Text style={styles.quoteHeader}>
                <Text style={styles.quoteHeaderBook}>Book:</Text>{" "}
                <Text style={styles.quoteHeaderBookName}>The Kite runner</Text>
              </Text>
              <Text style={styles.quoteContent}>
                It may be unfair, but what happens in a few days, sometimes even
                a single day, can change the course of a whole lifetime...
              </Text>
            </View>
            {/* More quote sections */}
          </View>
          <View style={styles.quoteSectionContainer}>
            <View style={styles.quoteSection}>
              <Text style={styles.quoteHeader}>
                <Text style={styles.quoteHeaderBook}>Book:</Text>{" "}
                <Text style={styles.quoteHeaderBookName}>The Kite runner</Text>
              </Text>
              <Text style={styles.quoteContent}>
                It may be unfair, but what happens in a few days, sometimes even
                a single day, can change the course of a whole lifetime...
              </Text>
            </View>
            {/* More quote sections */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    paddingTop:50
  },
  tasksWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionButton: {
    backgroundColor: "#7289DA",
    height: 28,
    width: 77,
    textAlign: "center",
    marginTop: 30,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign:"center"
  },
  sectionButtonText: {
    textAlign: "center",
    color: "white",
    marginTop: 5,
    fontWeight: "bold",
  },
  sectionSubtitle: {
    color: "white",
    fontSize: 12.5,
    textAlign: "center",
    marginTop: 35,
  },
  sectionSubtitleSpan: {
    color: "#7289DA",
    lineHeight: 15,
  },
  quoteSectionContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  quoteHeader: {
    color: "white",
  },
  quoteContent: {
    marginTop: 10,
    color: "white",
    lineHeight:21
  },
  quoteHeaderBook: {
    fontWeight: "bold",
  },
  quoteHeaderBookName: {
    color: "#7289DA",
    fontWeight: "bold",
  },
  quoteSection: {
    marginTop: 20,
    backgroundColor: "#282B30",
    borderRadius: 20,
    padding: 25,
  },
});

export default HomePage;
