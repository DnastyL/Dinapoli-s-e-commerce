export type eletronicProducts = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: "electronics";
  image_url: string;
  rating?: {
    rate: number;
    count: number;
  };
  quantity: number
};

export type User = {
  id: string;
  userName: string;
  email: string;
  password: string;
}

