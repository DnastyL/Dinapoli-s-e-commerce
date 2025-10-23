import { eletronicProducts } from "./definitions";
import { neon } from "@neondatabase/serverless";

const sql = neon(`${process.env.DATABASE_URL}`);

function cellPhoneProducts(data: eletronicProducts[]) {
  return data.filter((item) => item.category === "Cellphone");
}

function gamingPcProducts(data: eletronicProducts[]) {
  return data.filter((item) => item.category === "Gaming Pc");
}

export async function fetchElectronicProducts() {
  try {
    const data = await sql.query(`SELECT * FROM products`, [], {
      fetchOptions: { cache: "no-cache" },
    });

    return {
      electronicProducts: data as eletronicProducts[] | undefined,
      cellPhones: cellPhoneProducts(data as eletronicProducts[]),
      gamingPcs: gamingPcProducts(data as eletronicProducts[]),
    };
  } catch (error) {
    console.log(error);
    return {
      electronicProducts: undefined,
      cellPhones: undefined,
      gamingPcs: undefined,
    };
  }
}

export async function fetchFilteredEletronics(query: string, category: string = "All") {

  try {
    if(category == "All") {
    const products = await sql.query(
      `SELECT * FROM products
    WHERE
      products.title ILIKE $1 OR
      products.description ILIKE $1
      OR products.category ILIKE $1
    `,
      [`%${query.trim()}%`],
    );
    return products as eletronicProducts[];
  } else {
    const products = await sql.query(
      `SELECT * FROM products WHERE (products.title ILIKE $1 OR
      products.description ILIKE $1
      OR products.category ILIKE $1)
      AND products.category = $2
    `,
      [`%${query.trim()}%`, category],
    );
    return products as eletronicProducts[];
    }
  } catch (err) {
    console.log(err);
  }
}
