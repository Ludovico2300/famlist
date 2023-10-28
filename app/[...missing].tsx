import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function NotFoundScreen() {
  const tw = useTailwind();
  return (
    <View style={tw("min-h-screen bg-white flex items-center justify-center")}>
      <View style={tw("text-center")}>
        <Text style={tw("text-2xl font-bold")}>Oops!</Text>
        <Text style={tw("text-lg")}>This screen doesn't exist.</Text>
        <Link href="/" style={tw("text-blue-500")}>
          Go to Welcome screen!
        </Link>
      </View>
    </View>
  );
}
