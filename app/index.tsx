import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useTailwind } from "tailwind-rn";
import { Link, useNavigation } from "expo-router";

const Index = () => {
  const tw = useTailwind();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={tw("h-full justify-center items-center p-5")}>
      <Text style={tw("text-3xl font-bold text-center mb-4")}>Benvenuto!</Text>

      <Link href="/LoginScreen" style={tw("bg-blue-500 py-2 px-4 rounded-lg")}>
        <Text style={tw("text-white font-bold")}>Inizia a fare la spesa!</Text>
      </Link>
    </View>
  );
};

export default Index;
