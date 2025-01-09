import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AppContext from "@/context";
import { addDoc, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "@/firebaseConfig";

export default function AddNoteScreen() {
  const router = useRouter();
  const { userId, setUserId } = useContext(AppContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function getUserId() {
      try {
        let storedId = await AsyncStorage.getItem("user-id");
        // console.log(storedId);
        if (storedId) {
          setUserId(storedId);
        } else {
          const generatedId = uuidv4();
          await AsyncStorage.setItem("user-id", generatedId);
          setUserId(generatedId);
        }
      } catch (error) {
        console.error(`Error generating or getting user id: ${error}`);
      }
    }
    getUserId();
  }, []);

  const handleArrowPress = () => {
    router.push("/");
  };

  const handleAddNote = async () => {
    if (
      (note.title.trim() === "" && note.description.trim() === "") ||
      userId === ""
    )
      return;
    setIsAdding(true);
    try {
      const userNotesRef = collection(db, `users/${userId}/notes`);
      const addedNoteId = await addDoc(userNotesRef, note);
      console.log(addedNoteId.id);
      console.log("New note added successfully");
    } catch (error) {
      console.error(`Error saving note ${note}`);
      setIsAdding(false);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={handleArrowPress}>
          <AntDesign name="arrowleft" size={24} color="#7D7968" />
        </Pressable>
        <Pressable onPress={handleAddNote} disabled={isAdding}>
          <Text style={[styles.doneText, styles.customText]}>Done</Text>
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
          placeholder="Enter note title here..."
          onChangeText={(text) => setNote({ ...note, title: text })}
          value={note.title !== "" ? note.title : ""}
        />
        <TextInput
          style={[styles.textAreaContainer, styles.input, styles.customText]}
          placeholder="Enter note description here..."
          numberOfLines={12}
          multiline={true}
          onChangeText={(text) => setNote({ ...note, description: text })}
          value={note.description !== "" ? note.description : ""}
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
