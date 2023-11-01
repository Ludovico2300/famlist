import React, { useState } from "react";
import { TextInput, View, Button } from "react-native";
import { useTailwind } from "tailwind-rn";
import SelectDropdown from "react-native-select-dropdown";
import { categories } from "../assets/data/dataMock";
import useDatabaseItemsFirebase from "./hooks/useDatabaseItemsFirebase";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

type AddItemToItemsDBScreenProps = {
  params: {
    barcode: string;
  };
};

const AddItemToItemsDBScreen: React.FC = () => {
  //@ts-ignore
  const route = useRoute<AddItemToItemsDBScreenProps>();
  const barcode = route.params.barcode;
  const { writeToDatabase } = useDatabaseItemsFirebase();
  const tw = useTailwind();
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemBarcode, setItemBarcode] = useState(barcode);
  const [itemBrand, setItemBrand] = useState("");
  const navigation = useNavigation();

  const addItemToList = () => {
    handleAddPost();
    // Reset the form fields
    setItemName("");
    setItemDescription("");
    setItemCategory("");
    setItemBarcode("");
    setItemBrand("");
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
        id: itemBarcode.toUpperCase(),
        name: itemName.toUpperCase(),
        brand: itemBrand.toUpperCase(),
        description: itemDescription.toUpperCase(),
        category: itemCategory.toUpperCase(),
        barcode: itemBarcode.toUpperCase(),
      });
      alert("Elemento aggiunto con successo");
      //@ts-ignore
      navigation.navigate("ScanScreen");
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
      <TextInput
        style={tw("h-12 font-bold border border-blue-500 rounded px-2")}
        placeholder="Marca"
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

      <Button title="AGGIUNGI AL DATABASE" onPress={addItemToList} />
    </View>
  );
};

export default AddItemToItemsDBScreen;
