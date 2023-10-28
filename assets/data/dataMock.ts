// Item.ts
export type Item = {
  id: string;
  name: string;
  description?: string;
  category: string;
  quantity: number;
  price?: number;
  barcode?: string;
  author: string; // Add author property
};

export const items: Item[] = [
  {
    id: "1",
    name: "Burger",
    description: "Tasty",
    category: "Meat",
    quantity: 10,
    price: 5.99,
    barcode: "12333",
    author: "John Doe", // Add author
  },
  {
    id: "2",
    name: "HotDog",
    description: "Tasty",
    category: "Meat",
    quantity: 15,
    price: 5.99,
    barcode: "12334",
    author: "Jane Smith", // Add author
  },
  {
    id: "3",
    name: "Milk",
    description: "Tasty",
    category: "Drink",
    quantity: 30,
    price: 0.99,
    barcode: "12335",
    author: "Alice Johnson", // Add author
  },
  {
    id: "4",
    name: "Sprite",
    description: "Tasty",
    category: "Drink",
    quantity: 20,
    price: 5.99,
    barcode: "12336",
    author: "Bob Brown", // Add author
  },
  {
    id: "5",
    name: "Water",
    description: "Tasty",
    category: "Drink",
    quantity: 25,
    price: 5.99,
    barcode: "12337",
    author: "Eve Davis", // Add author
  },
  {
    id: "6",
    name: "Pizza",
    description: "Delicious",
    category: "Food",
    quantity: 5,
    price: 8.99,
    barcode: "12338",
    author: "Charlie Wilson", // Add author
  },
  {
    id: "7",
    name: "Soda",
    description: "Refreshing",
    category: "Drink",
    quantity: 40,
    price: 1.99,
    barcode: "12339",
    author: "Grace Lee", // Add author
  },
];

export default { items };
