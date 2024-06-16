"use client";

import { cn } from "@/lib/utils";
import { CreditCard, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"


const navItems = [
    {id:1,name:"Home",href:"/dashboard",icon:Home},
    {id:2,name:"Settings",href:"/dashboard/settings",icon:Settings},
    {id:3,name:"Billing",href:"/dashboard/billing",icon:CreditCard},
]
  
export function DashboardNav() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <ScrollArea className="h-72 w-48">
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <span
            className={cn(
              "group flex items-center  rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent" : "bg-transparent"
            )}
          >
            <item.icon className="mr-2 h-4 w-4 text-primary" />
            <span>{item.name}</span>
            
          </span>
        </Link>
      ))}
    </ScrollArea>
  );
}