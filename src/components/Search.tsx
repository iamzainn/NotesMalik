"use client";

import { SearchByTitle } from "@/action";
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"






export default function Search() {
   


  return (
    <div className="flex justify-center my-8 px-4 md:px-0">
      <form className="w-full max-w-md relative" action={SearchByTitle} >
       <button type="submit"className="flex absolute inset-y-0 left-0 items-center pl-3" >
       <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
       </button>
        <Input
          type="search"
          name="search"
          placeholder="Search..."
          
          className="w-full rounded-full pl-10 pr-4 py-2 border border-muted focus:border-primary focus:ring-0"
        />
      </form>
    </div>
  )
}

