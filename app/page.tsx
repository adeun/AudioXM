import BackIcon from "@/components/BackIcon";
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { auth } from '@/server/auth'
import AuthCard from "@/components/auth/AuthCard";

export default async function Home() {
  
  return (
    <>
      <main className="flex flex-col flex-1 relative  overflow-clip">
       
          <BackIcon />
        
        <div className=" flex-1 flex  backdrop-blur-lg items-center justify-center  bg-white/10">
         <AuthCard/>

        </div>


      </main>
    </>
  );
}
