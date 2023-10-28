import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Item } from "../../assets/data/dataMock";
import { useNavigation } from "@react-navigation/native"; // Use this import for React Navigation

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const tw = useTailwind();
  const navigation = useNavigation();

  return (
    <View
      style={tw("flex-row items-center justify-between border my-1 w-[100%]")}
    >
      <View>
        <Text>ID: {item.id}</Text>
        <Text>Name: {item.name}</Text>
        {item.description && <Text>Description: {item.description}</Text>}
        {item.category && <Text>Category: {item.category}</Text>}
        {item.price && <Text>Price: ${item.price.toFixed(2)}</Text>}
        {item.barcode && <Text>Barcode: {item.barcode}</Text>}
        {item.quantity && <Text>Quantity: {item.quantity}</Text>}
        {item.author && <Text>Author: {item.author}</Text>}
      </View>
      <TouchableOpacity
        onPress={() => {
          //@ts-ignore
          navigation.navigate("ItemDetailScreen", { item });
        }}
        style={tw("w-[50%]")}
      >
        <Text>Info</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemCard;
