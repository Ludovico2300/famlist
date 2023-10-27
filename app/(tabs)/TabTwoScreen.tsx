import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function TabTwoScreen() {
  const tw = useTailwind();
  return (
    <View style={tw("flex-1 items-center justify-center")}>
      <Text style={tw("font-bold text-xl")}>Tab Two</Text>
    </View>
  );
}
