import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import AppContext from "@/context";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "@/firebaseConfig";
import { showToast } from "@/utils/showToast";
import globalStyles from "@/styles/globalStyles";

export default function AddNoteScreen() {
  const router = useRouter();
  const { userId, setUserId } = useContext(AppContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    async function getUserId() {
      try {
        let storedId = await AsyncStorage.getItem("user-id");
        // console.log(storedId);
        if (storedId) {
          setUserId(storedId);
        } else {
          const generatedId = uuid.v4();
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
    try {
      const userNotesRef = collection(db, `users/${userId}/notes`);
      const addedNoteId = await addDoc(userNotesRef, {
        ...note,
        timestamp: serverTimestamp(),
      });
      console.log(addedNoteId.id);
      handleArrowPress();
    } catch (error) {
      console.error(`Error saving note ${note}`);
      showToast({
        type: "error",
        text1: "Error saving note..",
      });
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.row}>
        <Pressable onPress={handleArrowPress}>
          <AntDesign name="arrowleft" size={24} color="#7D7968" />
        </Pressable>
        <Pressable onPress={handleAddNote}>
          <Text style={[globalStyles.doneText, globalStyles.customText]}>
            Done
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
          placeholder="Enter note title here..."
          onChangeText={(text) => setNote({ ...note, title: text })}
          value={note.title !== "" ? note.title : ""}
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
          onChangeText={(text) => setNote({ ...note, description: text })}
          value={note.description !== "" ? note.description : ""}
          placeholderTextColor="#6C6C6C"
        />
      </View>
    </SafeAreaView>
  );
}
