'use server';

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { JSONContent } from "@tiptap/react";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";


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

  

    revalidatePath("/dashboard");
    redirect("/dashboard");
  } catch (e) {
    console.error("Error in code:", e);
    
    throw e; 
  }
}



 export async function postDataNote(jsonContent: { jsonContent: JSONContent | null }, formData: FormData ){
  const user = await getUser();

  if (!user) throw new Error("you are not allowed");

  const title = formData.get("title") as string;
  
  const id = formData.get("id") as string;

  await prisma.note.update({
    where: {
      id:id,
      userId: user.id,
    },
    data: {
      description: jsonContent ?? "",
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

export async function deleteNote(formData: FormData) {
  

  const noteId = formData.get("noteId") as string;

  await prisma.note.delete({
    where: {
      id: noteId,
    },
  });

  revalidatePath("/dashboard");
}


export async function getAllData(query?: string,skip=0) {
  
  noStore();
  const user = await getUser();


  const whereClause = query
  ? {
      userId: user?.id,
      title: {
        contains: query,
        mode: "insensitive",
      },
    }
  : { userId: user?.id } as any;
  const data = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      Notes: {
        where: whereClause,
        select: {
          title: true,
          id: true,
          description: true,
          createdAt: true,
        },
        take:10,
        skip:skip
        ,
        orderBy: {
          createdAt: "desc",
          
        },
        
      },

      Subscription: {
        select: {
          status: true,
        },
      },
    },
  });



  return data;
}