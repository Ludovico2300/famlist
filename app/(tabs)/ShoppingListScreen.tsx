import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { FlatList } from "react-native-gesture-handler";
import ItemCard from "../components/ItemCard";
import useDatabaseFirebase from "../hooks/useDatabaseFirebase";

export default function ShoppingListScreen() {
  const { list, getData } = useDatabaseFirebase();
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
      {list && list.length >= 1 ? (
        <FlatList
          data={list.length == 0 ? [] : categorySummaries}
          keyExtractor={(item) => item.category}
          renderItem={({ item: categorySummary }) => (
            <View key={categorySummary.category}>
              <Text style={tw("font-bold")}>
                {categorySummary.category} ({categorySummary.totalCount} items,
                Total Quantity: {categorySummary.totalQuantity})
              </Text>
              <FlatList
                data={
                  list.length == 0
                    ? []
                    : list.filter(
                        (item) => item.category === categorySummary.category
                      )
                }
                renderItem={({ item }) => <ItemCard item={item} />}
                style={tw("w-full")}
              />
            </View>
          )}
        />
      ) : (
        <Text style={tw("font-bold text-2xl mt-20")}>
          La lista della spesa è vuota!
        </Text>
      )}
    </View>
  );
}
