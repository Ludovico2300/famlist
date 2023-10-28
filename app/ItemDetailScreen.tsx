// ItemDetailScreen.tsx
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useRoute } from "@react-navigation/native";
import { Item } from "../assets/data/dataMock";
import useDatabaseFirebase from "./hooks/useDatabaseFirebase";
import { databaseData } from "../firebase";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

interface ItemDetailProps {
  params: { item: Item };
}

const ItemDetailScreen: React.FC = () => {
  const { deleteFromDatabase } = useDatabaseFirebase();
  const tw = useTailwind();
  //@ts-ignore
  const route = useRoute<ItemDetailProps>();
  const item = route.params.item;
  const navigation = useNavigation();

  const handleDeleteItem = async () => {
    try {
      if (item) deleteFromDatabase(item.name);
      alert("Item deleted successfully");
      navigation.goBack();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <View style={tw("flex-1 items-center justify-center w-screen")}>
      <Text style={tw("font-bold text-lg")}>Item Detail</Text>
      {item && (
        <>
          <Text>Name: {item.name}</Text>
          {item.description && <Text>Description: {item.description}</Text>}
          {item.category && <Text>Category: {item.category}</Text>}
          {item.barcode && <Text>Barcode: {item.barcode}</Text>}
          {item.quantity && <Text>Quantity: {item.quantity}</Text>}
          {item.author && <Text>Author: {item.author}</Text>}
        </>
      )}
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name="trash-o"
            size={50}
            color={"black"}
            style={tw(`${pressed ? "opacity-50" : ""}`)}
            onPress={() => handleDeleteItem()}
          />
        )}
      </Pressable>
    </View>
  );
};

export default ItemDetailScreen;
