import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Index() {
  const [notes, setNotes] = useState([]);

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

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
