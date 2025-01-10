import useGetFont from "@/hooks/useGetFont";
import { Stack } from "expo-router";
import { ContextProvider } from "@/context/index";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import { useEffect } from "react";

export default function RootLayout() {
  const { fontsLoaded } = useGetFont();

  if (fontsLoaded === null) return;

  useEffect(() => {
    const env = Constants.expoConfig?.extra?.env;

    if (env && typeof env === "object") {
      Object.entries(env).forEach(([key, value]) => {
        if (!key.startsWith("EXPO_PUBLIC_") || process.env[key]) return;
        process.env[key] = `${value}`;
      });
    }
  }, []);

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
