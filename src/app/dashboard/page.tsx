
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {  File } from "lucide-react";

import Search from "@/components/Search";
import { getAllData } from "@/action";
import DisplayNotes from "@/components/DisplayNotes";
import { unstable_noStore as noStore } from "next/cache";

export default async function DashboardPage({ searchParams }: { searchParams: { search: string } }) {
  
   noStore();
  const searchQuery = searchParams.search || "";
 


  const data =  await getAllData(searchQuery);

  
 
  

  
  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Notes</h1>
          <p className="text-lg text-muted-foreground">
            Here you can see and create new notes
          </p>
        </div>
        
          
        {data?.Subscription?.status === "active" ? (
          <Button asChild>
            <Link href="/dashboard/new">Create a new Note</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/dashboard/billing">Create a new Note</Link>
          </Button>
        )}
        
      </div>

      <div className="flex justify-start">
      <Search sv={searchQuery}></Search> 
      </div>

      {data?.Notes.length == 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>
           
          <h2 className="mt-6 text-xl font-semibold">
            You dont have any notes created
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently dont have any notes. please create some so that you
            can see them right here.
          </p>

          {data?.Subscription?.status === "active" ? (
            <Button asChild>
              <Link href="/dashboard/new">Create a new Note</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/dashboard/billing">Create a new Note</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-y-4" key={Math.random()}>
          <DisplayNotes Notes={data?.Notes} query={searchQuery}></DisplayNotes>
        </div>
      )}
    </div>
  );
}
