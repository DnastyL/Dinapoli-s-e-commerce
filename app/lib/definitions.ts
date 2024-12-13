export type eletronicProducts = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: "eletronics";
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number
};

