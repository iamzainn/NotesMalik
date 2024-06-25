'use client';
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

import Link from "next/link";


import { useState } from "react";
import { SubmitButton } from "@/components/Submitbuttons";
import { TipTapEditor } from "@/components/Tiptap";
import { postData } from "@/action";
import { JSONContent } from "@tiptap/react";

export default  function NewNoteRoute() {
  const [json, setJson] = useState <null | JSONContent>(null);

  const addNote = postData.bind(null, { jsonContent: json });
  

  return (
    <Card>
      <form action={addNote} >
        <CardHeader>
          <CardTitle>New Note</CardTitle>
          <CardDescription>
            Right here you can now create your new notes
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
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            
            <TipTapEditor setJson={setJson} json={json}></TipTapEditor>
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
  );
}