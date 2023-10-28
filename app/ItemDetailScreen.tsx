// ItemDetailScreen.tsx
import React from "react";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useRoute } from "@react-navigation/native";
import { Item } from "../assets/data/dataMock";

interface ItemDetailProps {
  params: { item: Item };
}

const ItemDetailScreen: React.FC = () => {
  const tw = useTailwind();
  //@ts-ignore
  const route = useRoute<ItemDetailProps>();

  const item = route.params.item;

  return (
    <View style={tw("flex-1 items-center justify-center w-screen")}>
      <Text style={tw("font-bold text-lg")}>Item Detail</Text>
      {item && (
        <>
          <Text>ID: {item.id}</Text>
          <Text>Name: {item.name}</Text>
          {item.description && <Text>Description: {item.description}</Text>}
          {item.category && <Text>Category: {item.category}</Text>}
          {item.price && <Text>Price: ${item.price.toFixed(2)}</Text>}
          {item.barcode && <Text>Barcode: {item.barcode}</Text>}
          {item.quantity && <Text>Quantity: {item.quantity}</Text>}
          {item.author && <Text>Author: {item.author}</Text>}
        </>
      )}
    </View>
  );
};

export default ItemDetailScreen;
