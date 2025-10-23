export interface ssdAbout {
  digital_storage_capacity: string;
  brand: string;
  special_feature: string;
  hard_disk_form_factor: string;
  installation_type: string;
  hard_disk_size: string;
  read_speed: string;
  write_speed: string;
  cache_size: string;
}

export interface monitorAbout {
  screen_size: string;
  resolution: string;
  panel_type: string;
  refresh_rate: string;
  response_time: string;
  aspect_ratio: string;
  brightness: string;
  features: string[];
}

export type productsType =
  | "Video Game"
  | "Gaming Pc"
  | "Keyboard"
  | "Storage Device"
  | "Monitor"
  | "Cellphone";

export type productTypeMap = {
  "Storage Device"?: ssdAbout;
  Monitor?: monitorAbout;
  "PC Gamer"?: string;
  Keyboard?: string;
  Cellphone?: string;
};
type productAbout = {
  [K in productsType]?: K extends "Storage Device"
    ? ssdAbout
    : K extends "Monitor"
    ? monitorAbout
    : "";
};

export type eletronicProducts = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: productsType;
  about: Record<string, string | string[]>;
  image_url: string[];
  rating?: {
    rate: number;
    count: number;
  };
  quantity: number;
};

export type User = {
  id: string;
  userName: string;
  email: string;
  password: string;
};
