import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

import { useTailwind } from "tailwind-rn";

const TabThreeScreen = () => {
  const tw = useTailwind();
  return (
    <View style={styles.container}>
      <Text style={tw("text-white")}>Hello world</Text>
      <Text style={styles.title}>Hello world</Text>
    </View>
  );
};

export default TabThreeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
