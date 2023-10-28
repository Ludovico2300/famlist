import React, { useState } from "react";
import {
  StatusBar,
  Text,
  TextInput,
  View,
  Button,
  Platform,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import useDatabaseFirebase from "./hooks/useDatabaseFirebase";
import useAuthFirebase from "./hooks/useAuthFirebase";

export default function AddItemToListScreen() {
  const { list, writeToDatabase } = useDatabaseFirebase();
  const { currentUser } = useAuthFirebase();
  const tw = useTailwind();
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemBarcode, setItemBarcode] = useState("");
  const [itemQuantity, setItemQuantity] = useState("1");
  const [itemAuthor, setItemAuthor] = useState(currentUser?.email ?? "");

  const addItemToList = () => {
    handleAddPost();
    // Reset the form fields
    setItemName("");
    setItemDescription("");
    setItemCategory("");
    setItemBarcode("");
    setItemQuantity("1");
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
      alert("Success");
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <View style={tw("flex-1 p-4 justify-around")}>
      <Text style={tw("font-bold text-xl mb-4")}>
        Aggiungi alla lista della spesa
      </Text>

      <TextInput
        style={tw("h-12 font-bold border border-blue-500 rounded px-2")}
        placeholder="Nome"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
      />
      <TextInput
        style={tw(
          "h-12 uppercase font-bold border border-blue-500 rounded px-2"
        )}
        placeholder="Descrizione"
        value={itemDescription}
        onChangeText={(text) => setItemDescription(text)}
      />
      <TextInput
        style={tw(
          "h-12 uppercase font-bold border border-blue-500 rounded px-2"
        )}
        placeholder="Categoria"
        value={itemCategory}
        onChangeText={(text) => setItemCategory(text)}
      />

      <TextInput
        style={tw(
          "h-12 uppercase font-bold border border-blue-500 rounded px-2"
        )}
        placeholder="Codice"
        value={itemBarcode}
        onChangeText={(text) => setItemBarcode(text)}
      />
      <TextInput
        style={tw(
          "h-12 uppercase font-bold border border-blue-500 rounded px-2"
        )}
        placeholder="Quantità"
        value={itemQuantity}
        onChangeText={(text) => setItemQuantity(text)}
      />
      <Button title="Add Item" onPress={addItemToList} />
    </View>
  );
}
