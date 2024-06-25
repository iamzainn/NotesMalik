'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState,useEffect } from "react";

import Link from "next/link";



import { SubmitButton } from "@/components/Submitbuttons";
import { getData, postDataNote } from "@/action";
import { TipTapEditor } from "@/components/Tiptap";
import { JSONContent } from "@tiptap/react";






export default  function DynamicRoute({

  params,
}: {
  params: { id: string };
}) 
  

{
  const [note ,setNote] = useState({} as any);
  const [json, setJson] = useState <null | JSONContent>({
    
  });

  const postNote = postDataNote.bind(null, { jsonContent: json });
  
  useEffect(() => {  
     getData({  noteId: params.id }).then((data) => {setNote(data);});
  },[params.id]);

   

  
  return (!(note.id) ? <p>loading...</p>:<>
  
  
    
    <Card>
      <form  action={postNote}>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
          <CardDescription>
            Right here you can now edit your notes
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label>Title</Label>
            <Input
              required
              type="text"
              name="title"
              placeholder="Title for your note"
              defaultValue={note.title}  
            />

            <Input
              required
              type="text"
              hidden
              name="id"
              placeholder="Title for your note"
              defaultValue={params.id}  
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>

            
             

            <TipTapEditor setJson={setJson} json={note.description.jsonContent}></TipTapEditor>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button asChild variant="destructive">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  
  </>)

}