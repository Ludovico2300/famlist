import { useEffect, useState } from "react";
import { databaseData } from "../../firebase";
import { ref, onValue, set, update, remove } from "firebase/database";
import useAuthFirebase from "./useAuthFirebase";
import { Item } from "../../assets/types/items";

export default function useDatabaseCategoriesFirebase() {
  const { currentUser } = useAuthFirebase();
  const [categories, setCategories] = useState<any[]>([]);
  const currentUserEmail = currentUser?.email;

  // READ DATABASE
  const getData = async () => {
    const databaseRef = ref(databaseData);

    onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();

      if (data && data.categories) {
        // Ensure that data.list exists and is an object

        setCategories(data.categories);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // WRITE DATABASE
  const writeToDatabase = async (newData: Item) => {
    const itemRef = ref(databaseData, "/categories/" + categories.length); // Use the name as the key

    set(itemRef, {
      name: newData.name,
    });
  };

  /*      // UPDATE DATABASE
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
  }; */

  /*   // DELETE FROM DATABASE
  const deleteFromDatabase = async (name: string) => {
    const itemRef = ref(databaseData, "/list/" + name);

    remove(itemRef);
  };

  // DELETE ALL FROM DATABASE
  const deleteAllFromDatabase = async () => {
    const itemRef = ref(databaseData, "/list/");

    remove(itemRef);
  }; */

  return {
    categories,
    writeToDatabase,
    /*     updateDatabase, */
    /*     deleteFromDatabase,
    deleteAllFromDatabase, */
    getData,
  };
}
