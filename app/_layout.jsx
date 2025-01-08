// import useGetFont from "@/hooks/useGetFont";
// import { Stack } from "expo-router";

// export default function RootLayout() {
//   const { fontsLoaded } = useGetFont();

//   if (fontsLoaded === null) return;

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="index" />
//       <Stack.Screen name="/notes/add-note" />
//       <Stack.Screen name="/notes/[id]" />
//     </Stack>
//   );
// }

import useGetFont from "@/hooks/useGetFont";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const { fontsLoaded } = useGetFont();

  if (fontsLoaded === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="/notes/add-note" />
      <Stack.Screen name="/notes/[id]" />
    </Stack>
  );
}
