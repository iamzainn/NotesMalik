'use server';

import { redirect } from "next/navigation";

export async function SearchByTitle(formData: FormData) {
    const search = formData.get("search") as string;
    console.log({search})
    if(search){
        redirect(`/dashboard/?search=${search}`);
    }
    redirect("/dashboard")
}