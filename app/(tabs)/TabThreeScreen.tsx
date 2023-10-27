import { View, Text } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";

const TabThreeScreen = () => {
  const tw = useTailwind();
  return (
    <View style={tw("flex flex-col")}>
      <Text style={tw("text-blue-600")}>Hello world</Text>
      <Text style={tw("text-blue-600")}>Hello world</Text>
    </View>
  );
};

export default TabThreeScreen;
