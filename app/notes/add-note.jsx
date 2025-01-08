import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

export default function AddNoteScreen() {
  const router = useRouter();
  const handleArrowPress = () => {
    router.push("/");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={handleArrowPress}>
          <AntDesign name="arrowleft" size={24} color="#7D7968" />
        </Pressable>
        <Pressable>
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
        />
        <TextInput
          style={[styles.textAreaContainer, styles.input, styles.customText]}
          placeholder="Enter note description here..."
          numberOfLines={12}
          multiline={true}
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
