import useGetFont from "@/hooks/useGetFont";
import { Stack } from "expo-router";

export default function RootLayout() {
  const { fontsLoaded } = useGetFont();

  if (fontsLoaded === null) return;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="notes/add-note" />
      <Stack.Screen name="notes/[id]" />
    </Stack>
  );
}
