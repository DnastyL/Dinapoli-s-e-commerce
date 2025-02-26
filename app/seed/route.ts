import { fetchElectronicProducts } from "../lib/data";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcrypt";

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const sql = neon(`${process.env.DATABASE_URL}`);

async function seedProdutcs() {
  const prod = await fetchElectronicProducts();

  await sql`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            price FLOAT NOT NULL,
            image_url VARCHAR(255) NOT NULL
        );
   `;

  const insertedProducts = prod
    ? await Promise.all(
        prod.map((p) => {
          return sql`
            INSERT INTO products (id, title, description, price, image_url)
            VALUES (${p.id}, ${p.title}, ${p.description}, ${p.price}, ${p.image_url})
            ON CONFLICT (id) DO NOTHING;
        `;
        })
      )
    : undefined;

  return insertedProducts;
}

async function seedUser() {
  await sql`
    CREATE EXTENSION if not exists "uuid-ossp"
  `;
  await sql`
    CREATE TABLE if not exists users(
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(users.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `
  }));

  return insertedUsers;
}

export async function GET() {
  try {
    await sql`BEGIN`;
    await seedUser();
    await sql`COMMIT`;
    return Response.json({ message: "Database seedeed" });
  } catch (err) {
    await sql`ROLLBACK`;
    return Response.json({ err }, { status: 500 });
  }
}
