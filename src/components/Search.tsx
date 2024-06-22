"use client";

import { SearchByTitle } from "@/action";
import { Input } from "@/components/ui/input"
import { SearchButton } from "./Submitbuttons";






export default function Search({sv}:{sv?:string}) {
   


  return (
    <div className="flex justify-center my-8 px-4 md:px-0">
      <form className="w-full max-w-md relative" action={SearchByTitle} >
          
         <SearchButton></SearchButton>
        
        <Input
          type="search"
          name="search"
          placeholder="Search..."
          defaultValue={sv??""}
          className="w-full rounded-full pl-10 pr-4 py-2 border border-muted focus:border-primary focus:ring-0"
        />
      </form>
    </div>
  )
}

