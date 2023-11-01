import React, { useState } from "react";
import {
  TextInput,
  View,
  Button,
  Pressable,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import useDatabaseFirebase from "./hooks/useDatabaseListFirebase";
import useAuthFirebase from "./hooks/useAuthFirebase";
import SelectDropdown from "react-native-select-dropdown";
import { ItemBarcode, categories } from "../assets/data/dataMock";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import useDatabaseItemsFirebase from "./hooks/useDatabaseItemsFirebase";
import TextFieldView from "./components/common/TextFieldView";
const { width } = Dimensions.get("window");

export default function AddItemToListScreen() {
  const { writeToDatabase, list } = useDatabaseFirebase();
  const { items } = useDatabaseItemsFirebase();
  const { currentUser } = useAuthFirebase();
  const tw = useTailwind();
  const [selectedItem, setSelectedItem] = useState<ItemBarcode>();
  const [itemName, setItemName] = useState(selectedItem?.name ?? "");
  const [itemBrand, setItemBrand] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemBarcode, setItemBarcode] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemAuthor, setItemAuthor] = useState(currentUser?.email ?? "");
  const [isManualSearch, setIsManualSearch] = useState(false);

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
    if (isManualSearch) {
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
    } else {
      if (selectedItem) {
        const itemAlreadyInList = list.find(
          (itemList) => itemList.barcode === selectedItem.barcode
        );
        try {
          if (itemAlreadyInList) {
            alert("Prodotto già presente in lista!");
            return;
          }
          writeToDatabase({
            name: selectedItem.name.toUpperCase(), // Use the item name as the key
            description: selectedItem.description?.toUpperCase(),
            category: selectedItem.category.toUpperCase(),
            quantity: Number(itemQuantity),
            barcode: selectedItem.barcode.toUpperCase(),
            author: itemAuthor,
          });
          alert("Elemento aggiunto con successo");
        } catch (e: any) {
          alert(e.message);
        }
      } else {
        alert("Seleziona un prodotto!");
        return;
      }
    }
  };

  return (
    <View style={tw("flex-1 p-4 justify-around")}>
      <TouchableOpacity
        style={tw("flex flex-row items-center justify-around mx-2")}
        onPress={() => setIsManualSearch(!isManualSearch)}
      >
        <Text style={tw("text-xl font-bold")}>
          {!isManualSearch ? "Inserimento Manuale" : "Ricerca per Prodotto"}
        </Text>

        <FontAwesome name="search" size={25} color={"black"} />
      </TouchableOpacity>
      {!isManualSearch ? (
        <>
          <SelectDropdown
            data={items}
            onSelect={(selectedItem) => {
              setSelectedItem(selectedItem);
            }}
            buttonStyle={tw("border border-blue-500 rounded px-2 w-full")}
            renderCustomizedButtonChild={(selectedItem) => {
              return (
                <View
                  style={tw("flex-row justify-between items-center w-full")}
                >
                  <Text style={tw("font-bold uppercase")}>
                    {selectedItem ? selectedItem.name : "SELEZIONA PRODOTTO"}
                  </Text>
                  <FontAwesome name="chevron-down" color={"#444"} size={18} />
                </View>
              );
            }}
            dropdownStyle={tw("bg-transparent h-fit")}
            rowStyle={tw("border rounded bg-white my-1")}
            renderCustomizedRowChild={(item) => {
              return (
                <View style={tw("flex-row justify-between mx-1")}>
                  <Text style={tw("flex text-sm ")}>{item.name}</Text>
                  <Text style={tw("flex text-sm")}>{item.brand}</Text>
                </View>
              );
            }}
            search
            searchInputStyle={tw("border border-blue-500 rounded px-2 w-full")}
            searchPlaceHolder={"Cerca un prodotto"}
            searchPlaceHolderColor={"darkgrey"}
          />
          {selectedItem && (
            <>
              <TextFieldView title="Nome" value={selectedItem.name} />
              {selectedItem.brand && (
                <TextFieldView title="Marca" value={selectedItem.brand} />
              )}
              {selectedItem.category && (
                <TextFieldView
                  title="Categoria"
                  value={selectedItem.category}
                />
              )}
              {selectedItem.description && (
                <TextFieldView
                  title="Descrizione"
                  value={selectedItem.description}
                />
              )}
              {selectedItem.barcode && (
                <TextFieldView title="Barcode" value={selectedItem.barcode} />
              )}
            </>
          )}
        </>
      ) : (
        <>
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
        </>
      )}
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
