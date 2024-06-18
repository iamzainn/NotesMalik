

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


import prisma from "@/lib/db";
import { NextResponse } from "next/server";

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
  });

  if (!dbUser) {
    
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email:user.email ?? "",
        name:user.given_name ?? "",
      
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/dashboard"
      : "https://marshal-ui-yt.vercel.app/"
  );
}