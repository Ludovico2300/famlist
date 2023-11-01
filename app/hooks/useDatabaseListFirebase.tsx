import { useEffect, useState } from "react";
import { databaseData } from "../../firebase";
import { ref, onValue, set, update, remove } from "firebase/database";
import useAuthFirebase from "./useAuthFirebase";
import { Item } from "../../assets/data/dataMock";

export default function useDatabaseListFirebase() {
  const { currentUser } = useAuthFirebase();
  const [list, setList] = useState<Item[]>([]);
  const currentUserEmail = currentUser?.email;

  // READ DATABASE
  const getData = async () => {
    const databaseRef = ref(databaseData);

    onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();

      if (data && data.list) {
        // Ensure that data.list exists and is an object
        const itemList = Object.keys(data.list).map((key) => ({
          ...data.list[key],
          name: key, // Use the name as the key
        }));
        setList(itemList);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // WRITE DATABASE
  const writeToDatabase = async (newData: Item) => {
    const itemRef = ref(databaseData, "/list/" + newData.name); // Use the name as the key

    set(itemRef, {
      id: newData.barcode,
      brand: newData.brand,
      name: newData.name,
      description: newData.description,
      category: newData.category,
      quantity: newData.quantity,
      barcode: newData.barcode,
      author: currentUserEmail,
    });
  };

  // UPDATE DATABASE
  const updateDatabase = async (updatedData: Item) => {
    const itemRef = ref(databaseData, "/list/" + updatedData.name);

    update(itemRef, {
      id: updatedData.barcode,
      brand: updatedData.brand,
      name: updatedData.name,
      description: updatedData.description,
      category: updatedData.category,
      quantity: updatedData.quantity,
      barcode: updatedData.barcode,
      author: currentUserEmail,
    });
  };

  // DELETE FROM DATABASE
  const deleteFromDatabase = async (name: string) => {
    const itemRef = ref(databaseData, "/list/" + name);

    remove(itemRef);
  };

  // DELETE ALL FROM DATABASE
  const deleteAllFromDatabase = async () => {
    const itemRef = ref(databaseData, "/list/");

    remove(itemRef);
  };

  return {
    list,
    writeToDatabase,
    updateDatabase,
    deleteFromDatabase,
    deleteAllFromDatabase,
    getData,
  };
}
