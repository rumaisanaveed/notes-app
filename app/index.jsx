import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AppContext from "@/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

// tasks
// fix the issue of loading and not found screen
// add animations
// add env file
// test
// prepare github readme
// post on linkedin

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
      const querySnapshot = await getDocs(
        collection(db, `users/${userId}/notes`)
      );
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

  const handleEditPress = (noteId) => {
    router.push(`/notes/${noteId}`);
  };

  const handleDeletePress = async (noteId) => {
    if (!noteId) {
      return;
    }
    try {
      const noteRef = doc(db, `users/${userId}/notes`, noteId);
      await deleteDoc(noteRef);
      console.log("Note deleted successfully");
      getNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.noteItem}>
        <View style={styles.noteItemRow}>
          <Text style={[styles.customText, styles.noteTitle]}>
            {item.title}
          </Text>
          <View style={styles.iconsRow}>
            <Pressable onPress={() => handleEditPress(item.id)}>
              <AntDesign name="edit" size={18} color="#7D7968" />
            </Pressable>
            <Pressable onPress={() => handleDeletePress(item.id)}>
              <AntDesign name="delete" size={16} color="#7D7968" />
            </Pressable>
          </View>
        </View>
        <Text style={styles.noteDescription}>{item.description}</Text>
      </View>
    );
  };

  const emptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Oops! No notes found.. Go and add some notes and come back here :)
        </Text>
      </View>
    );
  };

  const loadingComponent = () => {
    return (
      <View style={styles.loading}>
        <Text style={[styles.loadingText, styles.customText]}>Loading...</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.heading, styles.customText]}>My Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(note) => note.id}
        renderItem={renderItem}
        ListEmptyComponent={isNotesLoading && loadingComponent}
        showsVerticalScrollIndicator={false}
      />
      <Pressable style={styles.addButton} onPress={handleAddPress}>
        <AntDesign name="plus" size={25} color="#FFF5CF" />
      </Pressable>
      <StatusBar style="dark" backgroundColor="#FFF5CF" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF5CF",
    padding: 20,
    height: "100%",
    width: "100%",
  },
  heading: {
    fontSize: 48,
    fontWeight: 600,
    maxWidth: 150,
    marginBottom: 20,
  },
  customText: {
    fontFamily: "Poppins-Regular",
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
  emptyContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 30,
    fontWeight: "medium",
    color: "black",
    textAlign: "center",
  },
  loading: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 50,
    color: "black",
    fontWeight: 600,
  },
});
