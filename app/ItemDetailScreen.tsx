import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useRoute } from "@react-navigation/native";
import { Item } from "../assets/data/dataMock";
import useDatabaseFirebase from "./hooks/useDatabaseListFirebase";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import { categories } from "../assets/data/dataMock";

interface ItemDetailProps {
  params: { item: Item };
}

const ItemDetailScreen: React.FC = () => {
  const { deleteFromDatabase, updateDatabase } = useDatabaseFirebase();
  const tw = useTailwind();
  //@ts-ignore
  const route = useRoute<ItemDetailProps>();
  const item = route.params.item;
  const navigation = useNavigation();
  const [itemName, setItemName] = useState(item.name);
  const [itemBrand, setItemBrand] = useState(item.brand);
  const [itemDescription, setItemDescription] = useState(item.description);
  const [itemCategory, setItemCategory] = useState(item.category);
  const [itemBarcode, setItemBarcode] = useState(item.barcode);
  const [itemQuantity, setItemQuantity] = useState(item.quantity);

  const handleDeleteItem = async () => {
    try {
      if (item) deleteFromDatabase(item.name);
      alert("Elemento eliminato con successo!");
      navigation.goBack();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const editItemToList = async () => {
    try {
      if (item) deleteFromDatabase(item.name); //poichè uso il nome del item come identifier, devo prima eliminare il vecchio item per evitare doppioni
      updateDatabase({
        name: itemName.toUpperCase(), // Use the item name as the key
        description: itemDescription?.toUpperCase(),
        category: itemCategory.toUpperCase(),
        barcode: itemBarcode?.toUpperCase(),
        quantity: Number(itemQuantity),
        author: item.author,
      });
      alert("Elemento aggiornato con successo!");
      navigation.goBack();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <View style={tw("flex-1 p-4 justify-around")}>
      <Text style={tw("font-bold text-xl mb-4")}>
        {item.quantity >= 1
          ? "Modifica lista della spesa"
          : "Dettagli Prodotto"}
      </Text>

      <TextInput
        style={tw("h-12 font-bold border border-blue-500 rounded px-2")}
        placeholder="Nome"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
      />
      <TextInput
        style={tw("h-12 font-bold border border-blue-500 rounded px-2")}
        placeholder="Nome"
        value={itemBrand}
        onChangeText={(text) => setItemBrand(text)}
      />
      <SelectDropdown
        data={categories}
        onSelect={(selectedItem) => {
          setItemCategory(selectedItem);
        }}
        buttonStyle={tw("border border-blue-500 rounded px-2 w-full")}
        defaultButtonText="Seleziona una categoria"
        defaultValue={itemCategory}
      />
      <TextInput
        style={tw("h-12 font-bold border border-blue-500 rounded px-2")}
        placeholder="Descrizione"
        value={itemDescription}
        onChangeText={(text) => setItemDescription(text)}
      />

      <TextInput
        style={tw("h-12 font-bold border border-blue-500 rounded px-2")}
        placeholder="Codice"
        value={itemBarcode}
        onChangeText={(text) => setItemBarcode(text)}
      />
      {item.quantity >= 1 && (
        <>
          <View
            style={tw(
              "flex flex-row h-12 items-center justify-around font-bold border border-blue-500 rounded px-2"
            )}
          >
            <View style={tw("flex flex-col items-center mx-2")}>
              <Pressable
                onPress={() => setItemQuantity(itemQuantity - 1)}
                disabled={itemQuantity <= 1}
              >
                {({ pressed }) => (
                  <FontAwesome
                    name="minus-circle"
                    size={25}
                    color={"black"}
                    style={tw(`${pressed ? "opacity-50" : ""}`)}
                  />
                )}
              </Pressable>
            </View>
            <Text>{itemQuantity}</Text>
            <View style={tw("flex flex-col items-center mx-2")}>
              <Pressable onPress={() => setItemQuantity(itemQuantity + 1)}>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-circle"
                    size={25}
                    color={"black"}
                    style={tw(`${pressed ? "opacity-50" : ""}`)}
                  />
                )}
              </Pressable>
            </View>
          </View>
          <View style={tw("flex-row w-full items-center justify-around")}>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="trash-o"
                  size={50}
                  color={"red"}
                  style={tw(`${pressed ? "opacity-50" : ""}`)}
                  onPress={() => handleDeleteItem()}
                />
              )}
            </Pressable>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="edit"
                  size={50}
                  color={"blue"}
                  style={tw(`${pressed ? "opacity-50" : ""}`)}
                  onPress={() => editItemToList()}
                />
              )}
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

export default ItemDetailScreen;
