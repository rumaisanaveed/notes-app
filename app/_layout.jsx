import useGetFont from "@/hooks/useGetFont";
import { Stack } from "expo-router";
import { ContextProvider } from "@/context/index";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const { fontsLoaded } = useGetFont();

  if (fontsLoaded === null) return;

  return (
    <ContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="notes/add-note" />
        <Stack.Screen name="notes/[id]" />
      </Stack>
      <Toast />
    </ContextProvider>
  );
}
