import { useEffect, useState } from "react";
import { databaseData } from "../../firebase";
import { ref, onValue, set, update, remove } from "firebase/database";
import useAuthFirebase from "./useAuthFirebase";
import { Item, items } from "../../assets/data/dataMock";

export default function useDatabaseFirebase() {
  const { currentUser } = useAuthFirebase();
  const [list, setList] = useState<Item[]>([]);
  const currentUserCards = items.filter(
    (item) => item.author === currentUser?.displayName
  );

  //READ DATABASE
  useEffect(() => {
    onValue(ref(databaseData), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setList(data.list);
      }
    });
  }, []);

  //WRITE DATABASE
  const writeToDatabase = async (
    database: any,
    endpoint: string,
    identifierEndpoint: any,
    newData: Item
  ) => {
    set(ref(database, endpoint + identifierEndpoint), {
      id: newData.id,
      name: newData.name,
      description: newData.description,
      category: newData.category,
      quantity: newData.quantity,
      price: newData.price,
      barcode: newData.barcode,
      author: currentUser?.displayName,
    });
  };

  //UPDATE DATABASE
  const updateDatabase = async (
    database: any,
    endpoint: string,
    identifierEndpoint: any,
    newData: Item
  ) => {
    update(ref(database, endpoint + identifierEndpoint), {
      id: newData.id,
      name: newData.name,
      description: newData.description,
      category: newData.category,
      quantity: newData.quantity,
      price: newData.price,
      barcode: newData.barcode,
      author: currentUser?.displayName,
    });
  };
  //DELETE FROM DATABASE
  const deleteFromDatabase = async (
    database: any,
    endpoint: string,
    identifierEndpoint: any
  ) => {
    remove(ref(database, endpoint + identifierEndpoint));
  };

  return {
    list,
    currentUserCards,
    writeToDatabase,
    updateDatabase,
    deleteFromDatabase,
  };
}
