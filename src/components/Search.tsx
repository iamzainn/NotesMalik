"use client";

import { SearchByTitle } from "@/action";
import { Input } from "@/components/ui/input"
import { SearchButton } from "./Submitbuttons";






export default function Search({sv}:{sv?:string}) {
   


  return (
    <div className="flex justify-center my-8 px-4 md:px-0">
     <form className="flex items-center w-full max-w-md bg-background border rounded-lg overflow-hidden" action={SearchByTitle}>
      <div className="flex-1">
        <Input type="search"name="search" placeholder="Search..." className="w-full px-4 py-2 border-none focus:outline-none" />
      </div>
      <SearchButton></SearchButton>
    </form>
    </div>
  )
}

