// import { fetchElectronicProducts } from "../lib/data";
// import { neon } from "@neondatabase/serverless";
// import bcrypt from "bcrypt";
// import { eletronicProducts } from "../lib/definitions";

// const users = [
//   {
//     id: "410544b2-4001-4271-9855-fec4b6a6442a",
//     name: "User",
//     email: "user@nextmail.com",
//     password: "123456",
//   },
// ];

// const cellphones = [
//   {
//     id: 2,
//     title: 'iPhone 15',
//     price: 899.0,
//     image_url: [
//       'https://m.media-amazon.com/images/I/51-dI0OmzyL._AC_SX679_.jpg',
//       'https://m.media-amazon.com/images/I/51Bm0hHXaqL._AC_SX679_.jpg',
//       'https://m.media-amazon.com/images/I/312VbheIhGL._AC_SX679_.jpg',
//     ],
//     about: {
//       "Brand": "Apple",
//       "Operating System": "iOS 17 (Upgradable)",
//       "Ram Memory Installed Size": "6 GB",
//       "CPU Model": "Apple A16 Bionic",
//       "CPU Speed": "3.46 GHz",
//       "Memory Storage Capacity": "128 GB",
//       "Screen Size": "6.1 Inches",
//       Resolution: "2556 x 1179",
//       "Refresh Rate": "60 hertz",
//       "Model Name": "iPhone 15",
//     },
//     description:
//       'A high-end smartphone known for its performance and user-friendly operating system.',
//     category: 'Cellphone',
//   },
//   {
//     id: 3,
//     title: 'Google Pixel 8',
//     price: 699.5,
//     image_url: [
//       'https://m.media-amazon.com/images/I/71n1Bn04lJL._AC_SL1500_.jpg',
//     ],
//     about: {
//       "Brand": "Google",
//       "Operating System": "Android 14 (Upgradable)",
//       "Ram Memory Installed Size": "8 GB",
//       "CPU Model": "Google Tensor G3",
//       "CPU Speed": "3.0 GHz",
//       "Memory Storage Capacity": "128 GB",
//       "Screen Size": "6.2 Inches",
//       Resolution: "2400 x 1080",
//       "Refresh Rate": "120 hertz",
//       "Model Name": "Pixel 8",
//     },
//     description: 'Excellent camera quality and clean Android experience, powered by Google s Tensor chip.',
//     category: 'Cellphone'
//   },
//   {
//     id: 4,
//     title: 'Xiaomi Redmi Note 12',
//     price: 249.99,
//     image_url: [
//       'https://m.media-amazon.com/images/I/61ubC9EdkiL._AC_SX679_.jpg',
//       'https://m.media-amazon.com/images/I/51nl3Xve8JL._AC_SX679_.jpg',
//     ],
//     about: {
//       "Brand": "Xiaomi",
//       "Operating System": "Android 12/13 (MIUI)",
//       "Ram Memory Installed Size": "4 GB",
//       "CPU Model": "Snapdragon 685",
//       "CPU Speed": "2.8 GHz",
//       "Memory Storage Capacity": "128 GB",
//       "Screen Size": "6.67 Inches",
//       Resolution: "2400 x 1080",
//       "Refresh Rate": "120 hertz",
//       "Model Name": "Redmi Note 12",
//     },
//     description:
//       'A budget-friendly smartphone offering great value with a large display and fast charging.',
//     category: 'Cellphone',
//   },
//   {
//     id: 5,
//     title: 'Motorola Edge+',
//     price: 599.0,
//     image_url: [
//       'https://m.media-amazon.com/images/I/61eyXBlFk7L._AC_SX679_.jpg',
//       'https://m.media-amazon.com/images/I/517b9Dr+v8L._AC_SX679_.jpg',
//       'https://m.media-amazon.com/images/I/514Zv9OsM7L._AC_SX679_.jpg',
//     ],
//     about: {
//       "Brand": "Motorola",
//       "Operating System": "Android 13 (Upgradable)",
//       "Ram Memory Installed Size": "8 GB",
//       "CPU Model": "Qualcomm Snapdragon 8 Gen 2",
//       "CPU Speed": "3.2 GHz",
//       "Memory Storage Capacity": "512 GB",
//       "Screen Size": "6.7 Inches",
//       Resolution: "2400 x 1080",
//       "Refresh Rate": "165 hertz",
//       "Model Name": "Edge+ (2023)",
//     },
//     description:
//       'A premium mid-range phone with a sleek design and fast refresh rate display.',
//     category: 'Cellphone',
//   },
// ];

// const gamingPcs: Omit<eletronicProducts, "quantity">[] = [
//   {
//     id: 15,
//     about: {
//     "Brand": "Panorama Gaming PC",
//     "Operating System": "Windows 11 Pro",
//     "CPU Model": "Intel Core i5 13400F",
//     "CPU Speed": "2.5 GHz",
//     "Graphics Card Description": "Dedicated",
//     "Graphics Coprocessor": "GeForce RTX 5060 8GB",
//     "Memory Storage Capacity": "2 TB",
//     "Specific Uses For Product": "Gaming",
//     "Personal computer design type": "Computer Tower",
//     "RAM": "16GB DDR4 3200MHz",
//     "Storage Details": "1TB PCIe NVMe SSD + 1TB SATA SSD"
//   },
//   title: 'Panorama Gaming PC - Intel Core i5 13400F 2.5 GHz, RTX 5060 8GB, 16GB DDR4 RAM 3200MHz,1TB PCIe +1TB SATA SSD, WiFi & Bluetooth Windows 11 Pro-Black',
//   price: 999.99,
//   description: "CPU: Intel Core i5-13400F Processor 10 cores and 16 threads up to 4.60 GHz; GPU: GeForce RTX 5060 8GB GDDR7 Graphics Card-Black (Brand may vary); RAM: 16GB DDR4 3200MHz Memory; SSD: 1TB PCIe +1TB SATA Solid State Drive; Operating System: Windows 11 Pro 64-bit",
//   category: 'Gaming Pc',
//   image_url: [
//     "https://m.media-amazon.com/images/I/8153aaJKeEL._AC_SX466_.jpg",
//     "https://m.media-amazon.com/images/I/61p8b3vXJDL._AC_SL1500_.jpg",
//     "https://m.media-amazon.com/images/I/41YtG1oKpUL._AC_US40_.jpg",
//   ],
//   },
//   {
//   id: 16,
//   about: {
//     "Brand": "HP Victus",
//     "Operating System": "Windows 11 Home",
//     "CPU Model": "Intel Core i5-12400F",
//     "CPU Speed": "2.5 GHz",
//     "Graphics Card Description": "Dedicated",
//     "Graphics Coprocessor": "NVIDIA GeForce RTX 3050 8GB",
//     "Memory Storage Capacity": "512 GB",
//     "Specific Uses For Product": "Gaming",
//     "Personal computer design type": "Computer Tower",
//     "RAM": "16GB DDR4 3200MHz",
//     "Storage Details": "512GB PCIe NVMe M.2 SSD"
//   },
//   title: "HP Victus 15L Gaming Desktop - Intel Core i5-12400F, RTX 3050, 16GB RAM, 512GB SSD",
//   price: 799.99,
//   description: "CPU: 12th Generation Intel Core i5-12400F Processor (Base 2.5 GHz, Max Boost 4.4 GHz); GPU: NVIDIA GeForce RTX 3050 (8 GB GDDR6 dedicated); RAM: 16 GB DDR4-3200 MHz; Storage: 512 GB PCIe NVMe M.2 SSD; Operating System: Windows 11 Home 64-bit",
//   category: "Gaming Pc",
//   image_url: [
//     "https://m.media-amazon.com/images/I/8198TlVhZRL._AC_SX466_.jpg",
//     "https://m.media-amazon.com/images/I/71PCvICL2HL._AC_SX466_.jpg",
//     "https://m.media-amazon.com/images/I/71jcnIy72uL._AC_SX466_.jpg",
//   ]
// },

// ];
// const sql = neon(`${process.env.DATABASE_URL}`);

// async function seedProdutcs() {
//   const prod = await fetchElectronicProducts();

//   await sql`
//         CREATE TABLE IF NOT EXISTS products (
//             id SERIAL PRIMARY KEY,
//             title TEXT NOT NULL,
//             description TEXT NOT NULL,
//             price FLOAT NOT NULL,
//             image_url VARCHAR(255) NOT NULL
//         );
//    `;

//   const insertedProducts = prod
//     ? await Promise.all(
//         prod.map((p) => {
//           return sql`
//             INSERT INTO products (id, title, description, price, image_url)
//             VALUES (${p.id}, ${p.title}, ${p.description}, ${p.price}, ${p.image_url})
//             ON CONFLICT (id) DO NOTHING;
//         `;
//         })
//       )
//     : undefined;

//   return insertedProducts;
// }

// async function seedVideoGames() {
//  const insertGamingPcs = await Promise.all(
//     gamingPcs.map((pc) => {
//       return sql`INSERT INTO products (id, title, description, price, image_url, about, category)
//       VALUES (${pc.id}, ${pc.title}, ${pc.description}, ${pc.price}, ${pc.image_url}, ${JSON.stringify(pc.about)}, ${pc.category})
//       ON CONFLICT (id) DO NOTHING;`;
//     })
//   );

//   return insertGamingPcs
// }

// async function seedCellphones() {
//   const insertedCellPhones = await Promise.all(
//     cellphones.map((cell) => {
//       return sql`INSERT INTO products (id, title, description, price, image_url, about, category)
//       VALUES (${cell.id}, ${cell.title}, ${cell.description}, ${cell.price}, ${cell.image_url}, ${JSON.stringify(cell.about)}, ${cell.category})
//       ON CONFLICT (id) DO NOTHING;`;
//     })
//   );

//   return insertedCellPhones;
// }

// async function seedUser() {
//   await sql`
//     CREATE EXTENSION if not exists "uuid-ossp"
//   `;
//   await sql`
//     CREATE TABLE if not exists users(
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL
//     );
//   `;

//   const insertedUsers = await Promise.all(
//     users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, 10);

//       return sql`
//       INSERT INTO users (id, name, email, password)
//       VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//       ON CONFLICT (id) DO NOTHING;
//     `;
//     })
//   );

//   return insertedUsers;
// }

// export async function GET() {
//   try {
//     await sql`BEGIN`;
//     await seedVideoGames();
//     await sql`COMMIT`;
//     return Response.json({
//       message: "Gaming pcs seeded successfully",
//     });
//   } catch (err) {
//     await sql`ROLLBACK`;
//     return Response.json({ err }, { status: 500 });
//   }
// }
