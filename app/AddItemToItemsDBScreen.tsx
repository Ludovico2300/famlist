import React, { useState } from "react";
import { TextInput, View, Button, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import SelectDropdown from "react-native-select-dropdown";
import useDatabaseItemsFirebase from "./hooks/useDatabaseItemsFirebase";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import useDatabaseCategoriesFirebase from "./hooks/useDatabaseCategoriesFirebase";

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
  const { categories } = useDatabaseCategoriesFirebase();
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
        onSelect={(selectedCat) => {
          setItemCategory(selectedCat.name);
        }}
        buttonStyle={tw("border border-blue-500 rounded px-2 w-full")}
        renderCustomizedButtonChild={(item) => {
          return (
            <View style={tw("flex-row justify-between items-center w-full")}>
              <Text style={tw("font-bold uppercase")}>
                {itemCategory ? itemCategory : "SELEZIONA CATEGORIA"}
              </Text>
              <FontAwesome name="chevron-down" color={"#444"} size={18} />
            </View>
          );
        }}
        dropdownStyle={tw("bg-transparent")}
        rowStyle={tw("border rounded bg-white")}
        renderCustomizedRowChild={(item) => {
          return (
            <View style={tw("flex-row justify-between mx-1")}>
              <Text style={tw("flex text-sm ")}>{item.name}</Text>
            </View>
          );
        }}
        search
        searchInputStyle={tw("border border-blue-500 rounded px-2 w-full")}
        searchPlaceHolder={"Cerca una categoria"}
        searchPlaceHolderColor={"darkgrey"}
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
