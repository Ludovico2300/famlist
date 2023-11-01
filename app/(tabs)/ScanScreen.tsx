import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import useDatabaseItemsFirebase from "../hooks/useDatabaseItemsFirebase";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "expo-router";
import ItemBarcodeCard from "../components/ItemBarcodeCard";

export default function ScanScreen() {
  const tw = useTailwind();
  const { items } = useDatabaseItemsFirebase();
  const [hasPermission, setHasPermission] = useState(null);
  const [barcodeScanned, setBarcodeScanned] = useState<string>("");
  const [showBarcode, setShowBarcode] = useState(false);
  const [text, setText] = useState("Inquadra un codice");
  const [itemFound, setItemFound] = useState<any>();
  const navigation = useNavigation();

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      //@ts-ignore
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the barcode
  //@ts-ignore
  const handleBarCodeScanned = ({ data }) => {
    setBarcodeScanned(data);
    // Check if the scanned barcode is in the items array
    const foundItem = items.find((item) => item.barcode === data);

    if (foundItem) {
      setItemFound(foundItem);
      setText("Codice trovato");
    } else {
      setText("Codice non presente nel database");
    }
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={tw("flex-1 items-center justify-center")}>
        <Text>Requesting camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={tw("flex-1 items-center justify-center")}>
        <Text style={tw("m-4")}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Return the View
  return (
    <View style={tw("flex-1 items-center justify-around")}>
      <Button
        title={showBarcode ? "Nascondi Scanner" : "Mostra Scanner"}
        onPress={() => [
          setShowBarcode(!showBarcode),
          setBarcodeScanned(""),
          setItemFound(null),
          setText(""),
        ]}
      />
      <Text style={tw("text-xl m-4")}>
        {showBarcode ? text : "Attiva lo scanner!"}
      </Text>
      <View style={tw("w-[50%] h-[50%] overflow-hidden bg-transparent")}>
        {showBarcode && (
          <BarCodeScanner
            onBarCodeScanned={
              barcodeScanned === "" ? handleBarCodeScanned : undefined
            }
            style={tw("w-full h-full")}
          />
        )}
      </View>

      {barcodeScanned && (
        <Button
          title={"Scannerizza di nuovo"}
          onPress={() => setBarcodeScanned("")}
        />
      )}
      {itemFound && <ItemBarcodeCard item={itemFound} />}
      {text === "Codice non presente nel database" && (
        <Button
          title={"Aggiungi al DB"}
          onPress={() =>
            //@ts-ignore
            navigation.navigate("AddItemToItemsDBScreen", {
              barcode: barcodeScanned,
            })
          }
          color="tomato"
        />
      )}
    </View>
  );
}
