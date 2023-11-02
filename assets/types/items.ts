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
