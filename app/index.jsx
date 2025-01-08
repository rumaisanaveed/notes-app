import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "../data/notes";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ShowNotesScreen() {
  const [notes, setNotes] = useState([]);
  const router = useRouter();

  const handleAddPress = () => {
    router.push("/notes/add-note");
  };

  const handleEditPress = (noteId) => {
    router.push(`/notes/${noteId}`);
  };

  useEffect(() => {
    const getNotes = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users/user1/notes")
        );
        const notesArray = [];
        querySnapshot.forEach((doc) =>
          notesArray.push({ id: doc.id, ...doc.data() })
        );
        setNotes(notesArray);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    getNotes();
  }, []);

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
            <Pressable>
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.heading, styles.customText]}>My Notes</Text>
      <FlatList
        data={data}
        keyExtractor={(note) => note.id}
        renderItem={renderItem}
        ListEmptyComponent={emptyComponent}
        showsVerticalScrollIndicator={false}
      ></FlatList>
      <Pressable style={styles.addButton} onPress={handleAddPress}>
        <AntDesign name="plus" size={20} color="#FFF5CF" />
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
    height: 40,
    width: 40,
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
});
