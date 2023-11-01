import { View, Text } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";

type Props = {
  title: string;
  value: string | number;
};

const TextFieldView = (props: Props) => {
  const { title, value } = props;

  const tw = useTailwind();
  return (
    <View
      style={tw(
        "flex flex-row items-center justify-between h-12 border border-blue-500 rounded px-2"
      )}
    >
      <Text style={tw("font-bold uppercase underline")}>{title}:</Text>

      <Text style={tw("font-bold uppercase")}>{value}</Text>
    </View>
  );
};

export default TextFieldView;
