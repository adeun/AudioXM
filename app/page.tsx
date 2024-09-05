import BackIcon from "@/components/BackIcon";
import Test from "@/components/test";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AuthCard from "@/components/auth/AuthCard";

export default function Home() {
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
