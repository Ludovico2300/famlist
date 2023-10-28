import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import { Link } from "expo-router";

const Index = () => {
  const tw = useTailwind();

  // Function to navigate to the LoginScreen

  return (
    <View style={tw("h-full justify-center items-center p-5")}>
      <Text style={tw("text-3xl font-bold text-center mb-4")}>
        Welcome to My App
      </Text>
      <Text style={tw("text-gray-500 text-center mb-6")}>
        Enjoy your experience!
      </Text>

      <Link href="/LoginScreen" style={tw("bg-blue-500 py-2 px-4 rounded-lg")}>
        <Text style={tw("text-white font-bold")}> Go to LoginScreen!</Text>
      </Link>
    </View>
  );
};

export default Index;
