

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/Stripe";

export async function GET() {
  
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong...");
  }

  






  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select:{
      id: true,
      stripeCustomerId:true
    }
  });

  if (dbUser && !dbUser.stripeCustomerId) {

    const stripeCustomer = await stripe.customers.create({
      email: user.email as string,
    });
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        stripeCustomerId: stripeCustomer.id,
      },
    });
  }
  if (!dbUser) {
    const stripeCustomer = await stripe.customers.create({
      email: user.email as string,
    });
    
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email:user.email ?? "",
        name:user.given_name ?? "",
        stripeCustomerId: stripeCustomer.id,
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/dashboard"
      : "https://marshal-ui-yt.vercel.app/"
  );
}