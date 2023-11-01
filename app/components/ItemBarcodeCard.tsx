import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { ItemBarcode } from "../../assets/data/dataMock";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import useDatabaseListFirebase from "../hooks/useDatabaseListFirebase";
import useAuthFirebase from "../hooks/useAuthFirebase";

interface ItemBarcodeCardProps {
  item: ItemBarcode;
}

const ItemBarcodeCard: React.FC<ItemBarcodeCardProps> = ({ item }) => {
  const { writeToDatabase, list } = useDatabaseListFirebase();
  const { currentUser } = useAuthFirebase();
  const tw = useTailwind();
  const navigation = useNavigation();
  const currentUserEmail = currentUser?.email ?? "";

  const handleAddToList = async () => {
    const itemAlreadyInList = list.find(
      (itemList) => itemList.barcode === item.barcode
    );

    try {
      if (itemAlreadyInList) {
        alert("Prodotto già presente in lista!");
        return;
      }

      writeToDatabase({
        name: item.name,
        brand: item.brand,
        description: item.description,
        category: item.category,
        quantity: 1,
        barcode: item.barcode,
        author: currentUserEmail,
      });
      alert("Prodotto aggiunto alla lista!");
    } catch (error) {
      alert(error);
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
          <Pressable onPress={() => handleAddToList()}>
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

export default ItemBarcodeCard;
