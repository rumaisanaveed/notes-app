import Toast from "react-native-toast-message";

export const showToast = ({ type, text1 }) => {
  Toast.show({
    type: type || "",
    text1: text1 || "",
    position: "bottom",
    bottomOffset: 40,
    visibilityTime: 2000,
    autoHide: true,
  });
};
