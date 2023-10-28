import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { FlatList } from "react-native-gesture-handler";
import ItemCard from "../components/ItemCard";
import useDatabaseFirebase from "../hooks/useDatabaseFirebase";
import { Item } from "../../assets/data/dataMock";

export default function ShoppingListScreen() {
  const { list } = useDatabaseFirebase();
  const tw = useTailwind();

  // Create an array of unique categories
  const categories = [...new Set(list.map((item) => item.category))];

  // Calculate the total count, total quantity, and total price for each category
  const categorySummaries = categories.map((category) => {
    const categoryItems = list.filter((item) => item.category === category);
    const totalCount = categoryItems.length;
    const totalQuantity = categoryItems.reduce(
      (acc, item) => (item.quantity ? acc + item.quantity : acc),
      0
    );

    return {
      category,
      totalCount,
      totalQuantity,
    };
  });

  return (
    <View style={tw("flex-1 items-center justify-start w-screen")}>
      {list && list.length > 1 ? (
        <FlatList
          data={categorySummaries.filter((item) => item.category !== "X")}
          keyExtractor={(item) => item.category}
          renderItem={({ item: categorySummary }) => (
            <View key={categorySummary.category}>
              <Text
                style={tw(
                  "font-bold text-xl bg-blue-400 border border-blue-500 rounded"
                )}
              >
                {categorySummary.category} ({categorySummary.totalCount} ogg.,
                Quantità Totale: {categorySummary.totalQuantity})
              </Text>
              <FlatList
                data={list.filter(
                  (item: Item) => item.category === categorySummary.category
                )}
                renderItem={({ item }) => <ItemCard item={item} />}
                style={tw("w-full")}
              />
            </View>
          )}
        />
      ) : (
        <FlatList
          data={list}
          renderItem={() => (
            <Text style={tw("font-bold text-2xl mt-20")}>
              La lista della spesa è vuota!
            </Text>
          )}
          style={tw("w-full")}
          contentContainerStyle={tw("items-center justify-center")}
        />
      )}
    </View>
  );
}
