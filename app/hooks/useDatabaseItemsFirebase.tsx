import { useEffect, useState } from "react";
import { databaseData } from "../../firebase";
import { ref, onValue, set, update, remove } from "firebase/database";
import { ItemBarcode } from "../../assets/data/dataMock";

export default function useDatabaseItemsFirebase() {
  const [items, setItems] = useState<ItemBarcode[]>([]);

  // READ DATABASE
  const getData = async () => {
    const databaseRef = ref(databaseData);

    onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();

      if (data && data.items) {
        // Ensure that data.list exists and is an object
        const itemList = Object.keys(data.items).map((key) => ({
          ...data.items[key],
          barcode: key, // Use the name as the key
        }));
        setItems(itemList);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // WRITE DATABASE
  const writeToDatabase = async (newData: ItemBarcode) => {
    const itemRef = ref(databaseData, "/items/" + newData.barcode); // Use the barcode as the key

    set(itemRef, {
      id: newData.barcode,
      name: newData.name,
      description: newData.description,
      category: newData.category,
      brand: newData.brand,
      barcode: newData.barcode,
    });
  };

  // UPDATE DATABASE
  const updateDatabase = async (updatedData: ItemBarcode) => {
    const itemRef = ref(databaseData, "/items/" + updatedData.barcode);

    update(itemRef, {
      id: updatedData.barcode,
      name: updatedData.name,
      description: updatedData.description,
      category: updatedData.category,
      brand: updatedData.brand,
      barcode: updatedData.barcode,
    });
  };

  // DELETE FROM DATABASE
  const deleteFromDatabase = async (barcode: string) => {
    const itemRef = ref(databaseData, "/items/" + barcode);

    remove(itemRef);
  };

  // DELETE ALL FROM DATABASE
  const deleteAllFromDatabase = async () => {
    const itemRef = ref(databaseData, "/items/");

    remove(itemRef);
  };

  return {
    items,
    writeToDatabase,
    updateDatabase,
    deleteFromDatabase,
    deleteAllFromDatabase,
    getData,
  };
}
