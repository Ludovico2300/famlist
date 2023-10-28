import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import { Link } from "expo-router";

const LoginScreen = () => {
  const tw = useTailwind();
  return (
    <SafeAreaView
      style={tw("flex items-center justify-around h-full w-screen")}
    >
      <Text style={tw("text-red-600")}>Chi sei?</Text>
      <View style={tw("flex flex-col items-center w-[30%] border")}>
        <Link
          href="/TabOneScreen"
          style={tw("bg-blue-500 py-2 px-4 rounded-lg my-3 w-full text-center")}
        >
          <Text style={tw("text-white font-bold")}>Antonella</Text>
        </Link>
        <Link
          href="/TabOneScreen"
          style={tw("bg-blue-500 py-2 px-4 rounded-lg my-3 w-full text-center")}
        >
          <Text style={tw("text-white font-bold ")}>Luca</Text>
        </Link>
        <Link
          href="/TabOneScreen"
          style={tw("bg-blue-500 py-2 px-4 rounded-lg my-3 w-full text-center")}
        >
          <Text style={tw("text-white font-bold ")}>Ludo</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
