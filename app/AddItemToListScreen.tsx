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

export default function AddItemToListScreen() {
  const tw = useTailwind();
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemBarcode, setItemBarcode] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemAuthor, setItemAuthor] = useState("");

  const addItemToList = () => {
    // Handle adding the item to your list or database here
    // You can use a state management solution or an API call to handle this
    // For this example, we will just log the item details
    console.log("Item Name:", itemName);
    console.log("Item Description:", itemDescription);
    console.log("Item Category:", itemCategory);
    console.log("Item Price:", itemPrice);
    console.log("Item Barcode:", itemBarcode);
    console.log("Item Quantity:", itemQuantity);
    console.log("Item Author:", itemAuthor);

    // Reset the form fields
    setItemName("");
    setItemDescription("");
    setItemCategory("");
    setItemPrice("");
    setItemBarcode("");
    setItemQuantity("");
    setItemAuthor("");
  };

  return (
    <View style={tw("flex-1 items-center justify-center")}>
      <Text style={tw("font-bold text-xl")}>Add Item to List</Text>

      <TextInput
        style={tw("flex")}
        placeholder="Item Name"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
      />
      <TextInput
        style={tw("flex")}
        placeholder="Item Description"
        value={itemDescription}
        onChangeText={(text) => setItemDescription(text)}
      />
      <TextInput
        style={tw("flex")}
        placeholder="Item Category"
        value={itemCategory}
        onChangeText={(text) => setItemCategory(text)}
      />
      <TextInput
        style={tw("flex")}
        placeholder="Item Price"
        value={itemPrice}
        onChangeText={(text) => setItemPrice(text)}
      />
      <TextInput
        style={tw("flex")}
        placeholder="Item Barcode"
        value={itemBarcode}
        onChangeText={(text) => setItemBarcode(text)}
      />
      <TextInput
        style={tw("flex")}
        placeholder="Item Quantity"
        value={itemQuantity}
        onChangeText={(text) => setItemQuantity(text)}
      />
      <TextInput
        style={tw("flex")}
        placeholder="Item Author"
        value={itemAuthor}
        onChangeText={(text) => setItemAuthor(text)}
      />

      <Button title="Add Item" onPress={addItemToList} />
    </View>
  );
}
