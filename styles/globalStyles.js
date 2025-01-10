import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  customText: {
    fontFamily: "Poppins-Regular",
  },
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
  },
  inputContainer: {
    fontSize: 25,
    fontWeight: "semibold",
    color: "#000000",
  },
  textAreaContainer: {
    color: "#000000",
    fontWeight: "light",
    fontSize: 16,
    height: 300,
    textAlignVertical: "top",
    minHeight: 150,
  },
});

export default globalStyles;
