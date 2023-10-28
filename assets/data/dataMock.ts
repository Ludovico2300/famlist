// Item.ts
export type Item = {
  name: string;
  description?: string;
  category: string;
  quantity: number;
  barcode?: string;
  author: string; // Add author property
};

export const categories = [
  "BEVANDE",
  "VERDURA",
  "FRUTTA",
  "CARNE",
  "PESCE",
  "SURGELATI",
  "SALUMI E FORMAGGI",
  "ALTRO",
];

export const items: Item[] = [
  {
    name: "Burger",
    description: "Tasty",
    category: "Meat",
    quantity: 10,
    barcode: "12333",
    author: "John Doe", // Add author
  },
  {
    name: "HotDog",
    description: "Tasty",
    category: "Meat",
    quantity: 15,
    barcode: "12334",
    author: "Jane Smith", // Add author
  },
  {
    name: "Milk",
    description: "Tasty",
    category: "Drink",
    quantity: 30,
    barcode: "12335",
    author: "Alice Johnson", // Add author
  },
  {
    name: "Sprite",
    description: "Tasty",
    category: "Drink",
    quantity: 20,
    barcode: "12336",
    author: "Bob Brown", // Add author
  },
  {
    name: "Water",
    description: "Tasty",
    category: "Drink",
    quantity: 25,
    barcode: "12337",
    author: "Eve Davis", // Add author
  },
  {
    name: "Pizza",
    description: "Delicious",
    category: "Food",
    quantity: 5,
    barcode: "12338",
    author: "Charlie Wilson", // Add author
  },
  {
    name: "Soda",
    description: "Refreshing",
    category: "Drink",
    quantity: 40,
    barcode: "12339",
    author: "Grace Lee", // Add author
  },
];

export default { items };
