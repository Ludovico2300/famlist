import React from "react";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Item, items } from "../../assets/data/dataMock";
import { FlatList } from "react-native-gesture-handler";

export default function TabOneScreen() {
  const tw = useTailwind();

  // Create an array of unique categories
  const categories = [...new Set(items.map((item) => item.category))];

  // Calculate the total count, total quantity, and total price for each category
  const categorySummaries = categories.map((category) => {
    const categoryItems = items.filter((item) => item.category === category);
    const totalCount = categoryItems.length;
    const totalQuantity = categoryItems.reduce(
      (acc, item) => (item.quantity ? acc + item.quantity : acc),
      0
    );
    const totalPrice = categoryItems.reduce(
      (acc, item) => (item.price ? acc + item.price : acc),
      0
    );
    return {
      category,
      totalCount,
      totalQuantity,
      totalPrice,
    };
  });

  const renderItem = ({ item }: { item: Item }) => (
    <View style={tw("border my-1")}>
      <Text>ID: {item.id}</Text>
      <Text>Name: {item.name}</Text>
      {item.description && <Text>Description: {item.description}</Text>}
      {item.category && <Text>Category: {item.category}</Text>}
      {item.price && <Text>Price: ${item.price.toFixed(2)}</Text>}
      {item.barcode && <Text>Barcode: {item.barcode}</Text>}
      {item.quantity && <Text>Quantity: {item.quantity}</Text>}
      {item.author && <Text>Author: {item.author}</Text>}
    </View>
  );

  return (
    <View style={tw("flex-1 items-center justify-center w-screen")}>
      <FlatList
        data={categorySummaries}
        keyExtractor={(item) => item.category}
        renderItem={({ item: categorySummary }) => (
          <View key={categorySummary.category}>
            <Text style={tw("font-bold")}>
              {categorySummary.category} ({categorySummary.totalCount} items,
              Total Quantity: {categorySummary.totalQuantity}, Total Price: $
              {categorySummary.totalPrice.toFixed(2)})
            </Text>
            <FlatList
              data={items.filter(
                (item) => item.category === categorySummary.category
              )}
              renderItem={renderItem}
              style={tw("w-full")}
            />
          </View>
        )}
      />
    </View>
  );
}
