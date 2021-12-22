export type Products = {
  id: number;
  ownderId: number; // user who created a product
  title: string;
  imageUrl: string;
  description: string;
  price: number;
};
