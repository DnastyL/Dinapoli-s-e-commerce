import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { eletronicProducts } from "@/app/lib/definitions";

const handleCreateStripeProduct = async (
  cartProducts: eletronicProducts[],
  stripeProducts: Stripe.Response<Stripe.ApiList<Stripe.Product>>,
  stripe: Stripe
) => {
  let stripePData = [] as any;

  for (const product of cartProducts) {
    const isStripeProduct = stripeProducts.data.find(
      (stripeProduct) => stripeProduct.id === product.id.toString()
    );

    if (!isStripeProduct) {
      try {
        const newStripeP = await stripe.products.create({
          id: product.id.toString(),
          name: product.title,
          images: [...product.image_url],
          default_price_data: {
            currency: "usd",
            unit_amount: Math.round(product.price * 100),
          },
          description: product.description,
        });

        stripePData = [...stripePData, newStripeP];
      } catch (error) {
        throw new Error(
          "Failed to create a Stripe Product, it might already exist",
          error as Error
        );
      }
    }
  }

  return stripePData as Stripe.Response<Stripe.Product>[] | [];
};

const handleCreateCheckoutSession = async (
  products: Stripe.Product[],
  checkoutProducts: eletronicProducts[],
  stripe: Stripe
) => {
  let productsToSession: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  for (let p of checkoutProducts) {
    let productInStripe = products.find(
      (stripeP) => stripeP.id === p.id.toString()
    );
    if (productInStripe) {
      productsToSession.push({
        price: productInStripe.default_price?.toString(),
        quantity: p.quantity,
      });
    }
  }
  const session = await stripe.checkout.sessions.create({
    success_url: `${baseURL}/success`,
    cancel_url: `${baseURL}/cancel`,
    line_items: productsToSession,
    mode: "payment",
  });

  return session;
};

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!);

  try {
    const { products } = await req.json();
    const checkoutProducts: eletronicProducts[] = products;
    const stripeActiveProducts = await stripe.products.list();
    console.log(stripeActiveProducts);

    //Create Product in Stripe Dashboard if it doesn't exist
    const newStripeProducts = await handleCreateStripeProduct(
      checkoutProducts,
      stripeActiveProducts,
      stripe
    );

    //Creating the checkout session
    const session = await handleCreateCheckoutSession(
      [...stripeActiveProducts.data, ...newStripeProducts],
      checkoutProducts,
      stripe
    );

    console.log(session);

    return NextResponse.json(
      { url: session.url, status: 200 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: `Function POST went wrong ${error}` },
      { status: 500 }
    );
  }
}
