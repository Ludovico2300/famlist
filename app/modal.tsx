import { StatusBar } from "expo-status-bar";
import { Platform, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function ModalScreen() {
  const tw = useTailwind();

  return (
    <View style={tw("flex-1 items-center justify-center")}>
      <Text style={tw("font-bold text-xl")}>Modal</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
