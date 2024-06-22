import prisma from '@/lib/db';
import React from 'react';
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import NoteDetail, { NoteDetailProps } from '@/components/Note';



async function getData({  noteId }: { noteId: string }) {
    noStore();
    const data = await prisma.note.findUnique({
      where: {
        id: noteId,
        
      },
      select: {
        title: true,
        description: true,
        id: true,
        createdAt: true,
      },
    });
  
    return data;
  }

const ReadPage = async({params}:{params:{id:string}}) => {
    const data = await getData({  noteId: params.id });


  return (
    
        <div className="container mx-auto p-4 md:p-8">
          {data && <NoteDetail note={data} />}
        </div>
      );

}

export default ReadPage
