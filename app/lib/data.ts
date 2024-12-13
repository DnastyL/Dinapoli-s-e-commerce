import { eletronicProducts } from "./definitions";

export async function fetchFakeElectronics() {
  try {
    const request = await fetch(
      "https://fakestoreapi.com/products/category/electronics"
    );
    if (!request.ok) {
      throw new Error("Failed to request electronic products");
    }

    const data: eletronicProducts[] = await request.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchFilteredEletronics(query: string) {
  try {
    const req = await fetch(
      "https://fakestoreapi.com/products/category/electronics"
    );
    if (!req.ok) {
      throw new Error("Failed to request a specific eletronic product");
    }
    const data: eletronicProducts[] = await req.json();

    const filterData = data.filter(
      (p) =>
        p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        p.description.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );

    return filterData;
  } catch (err) {
    console.log(err);
  }
}
