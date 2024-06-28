

import { stripe } from "@/lib/Stripe";
import prisma from "@/lib/db";
import { headers } from "next/headers";
import Stripe from "stripe";
import { unstable_noStore as noStore } from "next/cache";


export async function POST(req: Request) {
  noStore();
  console.log("webhook called");
  

  const body = await req.text();

  // const signature = headers().get("Stripe-Signature") as string;
  const signature = req.headers.get("stripe-signature") as string;
  // console.log({"signature":signature})
  // console.log(process.env.STRIPE_WEBHOOK_SECRET)
  // console.log({"body":body})

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: unknown) {
    return new Response("webhook might be invalid", { status: 500 });
  }



  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const customerId = String(session.customer);

    const user = await prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId,
      },
    });

    if (!user) throw new Error("User not found...");

    await prisma.subscription.create({
      data: {
        stripeSubscriptionId: subscription.id,
        userId: user.id,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        status: subscription.status,
        planId: subscription.items.data[0].plan.id,
        invterval: String(subscription.items.data[0].plan.interval),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await prisma.subscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        planId: subscription.items.data[0].price.id,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        status: subscription.status,
      },
    });
  }

  return new Response("Subscription succecced", { status: 200 });
}
