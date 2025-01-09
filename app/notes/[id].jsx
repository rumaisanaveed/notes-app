import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import AppContext from "@/context";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function EditNoteScreen() {
  const { id: noteId } = useLocalSearchParams();
  const router = useRouter();
  const { userId } = useContext(AppContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const getNote = async () => {
    if (!userId || !noteId) return;
    setIsEditing(true);
    try {
      const querySnapshot = await getDocs(
        collection(db, `users/${userId}/notes`)
      );
      const existingNote = querySnapshot.docs.find((doc) => doc.id === noteId);
      // console.log(existingNote);
      if (existingNote) {
        const noteData = existingNote.data();
        setNote({
          title: noteData.title || "",
          description: noteData.description || "",
        });
      } else {
        console.log("No note found..");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    getNote();
  }, [noteId]);

  const handleArrowPress = () => {
    router.push("/");
  };

  const handleEditPress = async () => {
    if (note.title === "" && note.description === "") return;
    try {
      const docRef = doc(db, `users/${userId}/notes/${noteId}`);
      await setDoc(docRef, note, { merge: true });
      console.log("Note updated successfully");
    } catch (error) {
      console.error(`Error editing note ${error}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={handleArrowPress}>
          <AntDesign name="arrowleft" size={24} color="#7D7968" />
        </Pressable>
        <Pressable onPress={handleEditPress}>
          <Text style={[styles.doneText, styles.customText]}>Update</Text>
        </Pressable>
      </View>
      <View
        style={{
          marginTop: 25,
        }}
      >
        <TextInput
          maxLength={30}
          style={[styles.inputContainer, styles.input, styles.customText]}
          onChangeText={(text) => setNote({ ...note, title: text })}
          value={note.title ? note.title : ""}
          placeholder="Enter note title here..."
        />
        <TextInput
          style={[styles.textAreaContainer, styles.input, styles.customText]}
          placeholder="Enter note description here..."
          numberOfLines={12}
          multiline={true}
          value={note.description ? note.description : ""}
          onChangeText={(text) => setNote({ ...note, description: text })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF5CF",
    padding: 20,
    height: "100%",
    width: "100%",
    flex: 1,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  doneText: {
    color: "#F89348",
    fontSize: 18,
    fontWeight: "regular",
  },
  customText: {
    fontFamily: "Poppins-Regular",
  },
  input: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
  },
  inputContainer: {
    fontSize: 20,
    fontWeight: "medium",
    color: "#7D7968",
  },
  textAreaContainer: {
    marginTop: 12,
    color: "#6C6C6C",
    fontWeight: "light",
    fontSize: 16,
    height: 300,
    textAlignVertical: "top",
    minHeight: 150,
    paddingVertical: 10,
  },
});
