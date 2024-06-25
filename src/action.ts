'use server';

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { JSONContent } from "@tiptap/react";
import { revalidatePath } from "next/cache";

const { getUser } = getKindeServerSession();


export async function SearchByTitle(formData: FormData) {
    const search = formData.get("search") as string;
    console.log({search})
    if(search){
        redirect(`/dashboard/?search=${search}`);
    }
    redirect("/dashboard")
}

export async function postData(jsonContent: { jsonContent: JSONContent | null }, formData: FormData) {
  const user = await getUser();

  try {
    if (!user) {
      console.log("User not authorized");
      throw new Error("Not authorized");
    }

    const title = formData.get("title") as string;
    if (!title) {
      console.log("Title is missing");
      throw new Error("Title is required");
    }

    await prisma.note.create({
      data: {
        userId: user.id,
        description: jsonContent ?? "",
        title: title,
      },
    });

    console.log("Note created successfully, redirecting to /dashboard");

    revalidatePath("/dashboard");
    redirect("/dashboard");
  } catch (e) {
    console.error("Error in code:", e);
    // Optionally, rethrow the error or handle it differently
    throw e; // This ensures the error is properly propagated
  }
}



 export async function postDataNote(formData: FormData) {
  const user = await getUser();

  if (!user) throw new Error("you are not allowed");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const id = formData.get("id") as string;

  await prisma.note.update({
    where: {
      id:id,
      userId: user.id,
    },
    data: {
      description: description,
      title: title,
    },
  });

  revalidatePath("/dashboard");

  return redirect("/dashboard");
}

export async function getData({ noteId }: { noteId: string }) {
  const user = await getUser();

  if (!user) throw new Error("you are not allowed");

      
  const data = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId: user.id
    },
    select: {
      title: true,
      description: true,
      id: true,
    },
  });

  return data;
}