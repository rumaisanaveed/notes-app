import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import AppContext from "@/context";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { showToast } from "@/utils/showToast";
import globalStyles from "@/styles/globalStyles";

export default function EditNoteScreen() {
  const {
    id: noteId,
    title: noteTitle,
    description: noteDescription,
  } = useLocalSearchParams();
  const router = useRouter();
  const { userId } = useContext(AppContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const setNoteDetails = () => {
    setNote({
      title: noteTitle,
      description: noteDescription,
    });
  };

  useEffect(() => {
    setNoteDetails();
  }, [noteId]);

  const handleArrowPress = () => {
    router.push("/");
  };

  const handleEditPress = async () => {
    if (note.title === "" && note.description === "") return;
    try {
      const docRef = doc(db, `users/${userId}/notes/${noteId}`);
      await setDoc(
        docRef,
        { ...note, timestamp: serverTimestamp() },
        { merge: true }
      );
      console.log("Note updated successfully");
      handleArrowPress();
    } catch (error) {
      console.error(`Error editing note ${error}`);
      showToast({
        type: "error",
        text1: "Error updating note..",
      });
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.row}>
        <Pressable onPress={handleArrowPress}>
          <AntDesign name="arrowleft" size={24} color="#7D7968" />
        </Pressable>
        <Pressable onPress={handleEditPress}>
          <Text style={[globalStyles.doneText, globalStyles.customText]}>
            Update
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          marginTop: 25,
        }}
      >
        <TextInput
          maxLength={30}
          style={[
            globalStyles.inputContainer,
            globalStyles.input,
            globalStyles.customText,
          ]}
          onChangeText={(text) => setNote({ ...note, title: text })}
          value={note.title ? note.title : ""}
          placeholder="Enter note title here..."
          placeholderTextColor="#7D7968"
        />
        <TextInput
          style={[
            globalStyles.textAreaContainer,
            globalStyles.input,
            globalStyles.customText,
          ]}
          placeholder="Enter note description here..."
          numberOfLines={12}
          multiline={true}
          value={note.description ? note.description : ""}
          placeholderTextColor="#6C6C6C"
          onChangeText={(text) => setNote({ ...note, description: text })}
        />
      </View>
    </SafeAreaView>
  );
}
