// Item.ts
export type Item = {
  id?: string;
  name: string;
  brand?: string;
  description?: string;
  category: string;
  barcode?: string;
  quantity: number;
  author?: string;
};
export type ItemBarcode = {
  id: string;
  name: string;
  brand?: string;
  description?: string;
  category: string;
  barcode: string;
};

export const itemsBarcode: ItemBarcode[] = [
  {
    id: "80015529",
    name: "Acqua Naturale",
    brand: "Levissima",
    description: "Bottiglia 2L",
    category: "Drink",
    barcode: "80015529",
  },
];

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
