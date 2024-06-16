import { DashboardNav } from "@/components/DashNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const DashoboardLayout = async({children}:{children: React.ReactNode}) => {

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return redirect("/");
    }

  return (
  
    <div className="flex flex-col mt-10">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
         <DashboardNav></DashboardNav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
    
  )
}

export default DashoboardLayout;
