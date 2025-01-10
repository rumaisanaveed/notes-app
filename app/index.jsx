import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AppContext from "@/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { truncateText } from "@/utils/truncateText";
import Animated, { LinearTransition } from "react-native-reanimated";
import { showToast } from "@/utils/showToast";
import globalStyles from "@/styles/globalStyles";

// env file
// build
// github readme
// linkedin post

export default function ShowNotesScreen() {
  const [notes, setNotes] = useState([]);
  const router = useRouter();
  const { userId, setUserId } = useContext(AppContext);
  const [isNotesLoading, setIsNotesLoading] = useState(false);

  const getNotes = async () => {
    if (!userId) {
      setIsNotesLoading(false);
      return;
    }
    setIsNotesLoading(true);
    try {
      const userNotesRef = collection(db, `users/${userId}/notes`);
      const notesQuery = query(userNotesRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(notesQuery);
      const notesArray = [];
      querySnapshot.forEach((doc) =>
        notesArray.push({ id: doc.id, ...doc.data() })
      );
      setNotes(notesArray);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsNotesLoading(false);
    }
  };

  useEffect(() => {
    const getUserId = async () => {
      const storedId = await AsyncStorage.getItem("user-id");
      // console.log(userId);
      if (storedId) {
        setUserId(storedId);
      } else {
        console.log("No id found");
      }
    };
    getUserId();
  }, [userId]);

  useEffect(() => {
    getNotes();
  }, [userId]);

  const handleAddPress = () => {
    router.push("/notes/add-note");
  };

  const handleEditPress = ({ id, title, description }) => {
    router.push({
      pathname: `/notes/${id}`,
      params: {
        title: title,
        description: description,
      },
    });
  };

  const handleDeletePress = async (noteId) => {
    if (!noteId) {
      return;
    }
    const newNotes = notes.filter((note) => note.id !== noteId);
    setNotes(newNotes);
    try {
      const noteRef = doc(db, `users/${userId}/notes`, noteId);
      await deleteDoc(noteRef);
      console.log("Note deleted successfully");
    } catch (error) {
      console.error(error);
      showToast({
        type: "error",
        text1: "Error deleting note...",
      });
      // if the note fails due to some error
      setNotes((prevNotes) => [
        ...prevNotes,
        notes.find((note) => note.id === noteId),
      ]);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.noteItem}>
        <View style={styles.noteItemRow}>
          <Text style={[globalStyles.customText, styles.noteTitle]}>
            {item.title}
          </Text>
          <View style={styles.iconsRow}>
            <Pressable onPress={() => handleEditPress(item)}>
              <AntDesign name="edit" size={18} color="#7D7968" />
            </Pressable>
            <Pressable onPress={() => handleDeletePress(item.id)}>
              <AntDesign name="delete" size={16} color="#7D7968" />
            </Pressable>
          </View>
        </View>
        <Text style={styles.noteDescription}>
          {truncateText(item.description) + "..."}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={[styles.heading, globalStyles.customText]}>My Notes</Text>
      {isNotesLoading && (
        <View style={styles.containerCentered}>
          <Text style={[styles.loadingText, globalStyles.customText]}>
            Loading...
          </Text>
        </View>
      )}
      {!isNotesLoading && notes.length > 0 && (
        <Animated.FlatList
          data={notes}
          keyExtractor={(note) => note.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          itemLayoutAnimation={LinearTransition}
          keyboardDismissMode="on-drag"
        />
      )}
      {!isNotesLoading && notes.length === 0 && (
        <View style={styles.containerCentered}>
          <Text style={styles.emptyText}>
            Oops! No notes found.. Go and add some notes and come back here :|
          </Text>
        </View>
      )}
      <Pressable style={styles.addButton} onPress={handleAddPress}>
        <AntDesign name="plus" size={25} color="#FFF5CF" />
      </Pressable>
      <StatusBar style="dark" backgroundColor="#FFF5CF" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 48,
    fontWeight: 600,
    maxWidth: 150,
    marginBottom: 20,
  },
  noteItem: {
    borderColor: "#E8E0C0",
    borderWidth: 1,
    width: "100%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  noteItemRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noteTitle: {
    color: "#000000",
    fontSize: 20,
    fontWeight: 600,
    flex: 1,
  },
  iconsRow: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    width: "auto",
    maxWidth: "80%",
  },
  noteDescription: {
    fontWeight: "light",
    fontSize: 14,
    color: "#6C6C6C",
    marginTop: 6,
  },
  addButton: {
    backgroundColor: "#F89348",
    borderRadius: "100%",
    height: 50,
    width: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  containerCentered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 30,
    fontWeight: "medium",
    color: "black",
    textAlign: "center",
  },
  loadingText: {
    fontSize: 30,
    color: "black",
    fontWeight: 600,
  },
});
