import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Item } from "../../assets/data/dataMock";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import useDatabaseFirebase from "../hooks/useDatabaseFirebase";

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { updateDatabase } = useDatabaseFirebase();
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const tw = useTailwind();
  const navigation = useNavigation();

  const handleDecrementQuantity = async () => {
    try {
      if (quantity > 1) {
        const updatedItem = {
          ...item,
          quantity: quantity - 1,
        };
        setQuantity(quantity - 1);
        updateDatabase(updatedItem);
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleIncrementQuantity = async () => {
    try {
      const updatedItem = {
        ...item,
        quantity: quantity + 1,
      };
      setQuantity(quantity + 1);
      updateDatabase(updatedItem);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <View
      style={tw(
        "bg-blue-500 flex-row items-center justify-between border my-1 w-96 h-12 m-2 rounded"
      )}
    >
      <View style={tw("mx-2")}>
        <Text style={tw("text-white font-bold")}>{item.name}</Text>
      </View>
      <View style={tw("w-[50%] flex-row items-center justify-between")}>
        <View style={tw("flex flex-col items-center")}>
          <Pressable
            onPress={() => {
              //@ts-ignore
              navigation.navigate("ItemDetailScreen", { item });
            }}
          >
            {({ pressed }) => (
              <FontAwesome
                name="info-circle"
                size={25}
                color={"white"}
                style={tw(`${pressed ? "opacity-50" : ""}`)}
              />
            )}
          </Pressable>
        </View>
        <View style={tw("flex flex-col items-center mx-2")}>
          <Pressable onPress={handleDecrementQuantity} disabled={quantity <= 1}>
            {({ pressed }) => (
              <FontAwesome
                name="minus-circle"
                size={25}
                color={"white"}
                style={tw(`${pressed ? "opacity-50" : ""}`)}
              />
            )}
          </Pressable>
        </View>
        <Text>{quantity}</Text>
        <View style={tw("flex flex-col items-center mx-2")}>
          <Pressable onPress={handleIncrementQuantity}>
            {({ pressed }) => (
              <FontAwesome
                name="plus-circle"
                size={25}
                color={"white"}
                style={tw(`${pressed ? "opacity-50" : ""}`)}
              />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ItemCard;
