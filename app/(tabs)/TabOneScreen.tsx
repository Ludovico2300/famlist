import { Text, View } from "react-native";

import { useTailwind } from "tailwind-rn";

export default function TabOneScreen() {
  const tw = useTailwind();
  return (
    <View style={tw("flex-1 items-center justify-center")}>
      <Text style={tw("font-bold text-xl")}>Tab One</Text>
      <Text style={tw("text-blue-600")}>Hello world</Text>
    </View>
  );
}
