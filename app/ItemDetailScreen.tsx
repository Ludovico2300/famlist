import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useRoute } from "@react-navigation/native";
import useDatabaseFirebase from "./hooks/useDatabaseListFirebase";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import useDatabaseCategoriesFirebase from "./hooks/useDatabaseCategoriesFirebase";
import TextFieldView from "./components/common/TextFieldView";
import { Item } from "../assets/types/items";

interface ItemDetailProps {
  params: { item: Item };
}

const ItemDetailScreen: React.FC = () => {
  const { deleteFromDatabase, updateDatabase } = useDatabaseFirebase();
  const { categories } = useDatabaseCategoriesFirebase();
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
        id: itemName.toUpperCase(), // Use the item name as the key
        brand: itemBrand?.toUpperCase(),
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
      {item.quantity >= 1 ? (
        <>
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
            onSelect={(selectedCat) => {
              setItemCategory(selectedCat.name);
            }}
            buttonStyle={tw("border border-blue-500 rounded px-2 w-full")}
            renderCustomizedButtonChild={(item) => {
              return (
                <View
                  style={tw("flex-row justify-between items-center w-full")}
                >
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
      ) : (
        <>
          <TextFieldView title="Nome" value={itemName} />
          {itemBrand && <TextFieldView title="Marca" value={itemBrand} />}
          {itemCategory && (
            <TextFieldView title="Categoria" value={itemCategory} />
          )}
          {itemDescription && (
            <TextFieldView title="Descrizione" value={itemDescription} />
          )}
          {itemBarcode && <TextFieldView title="Barcode" value={itemBarcode} />}
        </>
      )}
    </View>
  );
};

export default ItemDetailScreen;
