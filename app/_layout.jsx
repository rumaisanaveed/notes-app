import useGetFont from "@/hooks/useGetFont";
import { Stack } from "expo-router";
import { ContextProvider } from "@/context/index";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import { useEffect } from "react";

export default function RootLayout() {
  const { fontsLoaded } = useGetFont();

  if (fontsLoaded === null) return;

  // loading all the env variables

  useEffect(() => {
    // getting that env object from app.config file
    const env = Constants.expoConfig?.extra?.env;

    // to make sure that we don't get undefined
    if (env && typeof env === "object") {
      Object.entries(env).forEach(([key, value]) => {
        // if the env variables are not already set or the env variables doesn't start with EXPO_PUBLIC
        if (!key.startsWith("EXPO_PUBLIC_") || process.env[key]) return;
        // set the env variables with the values getting from the env object
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
