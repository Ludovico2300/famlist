import React, { useState } from "react";
import { TextInput, View, Button, Pressable, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import useDatabaseFirebase from "./hooks/useDatabaseFirebase";
import useAuthFirebase from "./hooks/useAuthFirebase";
import SelectDropdown from "react-native-select-dropdown";
import { categories } from "../assets/data/dataMock";
import { FontAwesome } from "@expo/vector-icons";

export default function AddItemToListScreen() {
  const { writeToDatabase } = useDatabaseFirebase();
  const { currentUser } = useAuthFirebase();
  const tw = useTailwind();
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemBarcode, setItemBarcode] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemAuthor, setItemAuthor] = useState(currentUser?.email ?? "");

  const addItemToList = () => {
    handleAddPost();
    // Reset the form fields
    setItemName("");
    setItemDescription("");
    setItemCategory("");
    setItemBarcode("");
    setItemQuantity(1);
  };

  const handleAddPost = async () => {
    if (itemName === "") {
      alert("Inserisci un nome valido");
      return;
    }

    if (itemCategory === "") {
      alert("Inserisci una categoria valida");
      return;
    }

    try {
      writeToDatabase({
        name: itemName.toUpperCase(), // Use the item name as the key
        description: itemDescription.toUpperCase(),
        category: itemCategory.toUpperCase(),
        quantity: Number(itemQuantity),
        barcode: itemBarcode.toUpperCase(),
        author: itemAuthor,
      });
      alert("Elemento aggiunto con successo");
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <View style={tw("flex-1 p-4 justify-around")}>
      <TextInput
        style={tw("h-12 font-bold border border-blue-500 rounded px-2")}
        placeholder="Nome"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
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
      <Button title="AGGIUNGI ALLA LISTA DELLA SPESA" onPress={addItemToList} />
    </View>
  );
}
