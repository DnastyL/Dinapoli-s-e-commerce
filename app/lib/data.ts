import { eletronicProducts } from "./definitions";
import { neon } from "@neondatabase/serverless";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function fetchElectronicProducts() {
  try {
    const data = await sql`SELECT * FROM products`;
    return data as eletronicProducts[];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchFilteredEletronics(query: string) {
  try {
    const products = await sql`SELECT 
    products.id, products.title,
    products.description, products.price, products.image_url FROM products
    WHERE
      products.title ILIKE ${`%${query}%`} OR
      products.description ILIKE ${`%${query}%`}
    `;
    return products as eletronicProducts[];
  } catch (err) {
    console.log(err);
  }
}
