
import { Button } from "@/components/ui/Button"

import Header from "./Dashboard/_components/Header";

import VideoCard from "@/lib/videoCard";
import Link from "next/link";



export default function Home() {
  return (
    <div>
      <Header/>
    
        <div>
      <div className="justify-center text-center text-white">
        <Button className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 my-4 mb-2"> join the conversation on Discord </Button>
        <div className="w-1/2 m-auto ">
          <div className="font-mono text-5xl "><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Automate</span> your social media
                      virality with <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">AI</span></div>
        </div> 
        <p className="m-7 text-pretty">Get your social media posts viral with AI.</p>
       <Link href={'/Dashboard/create-new'}>
        <Button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Turn words into videos</Button>  
        </Link>
      </div>
      <div>
        <VideoCard/>
      </div>
      
      </div>
      
    </div>
    
    
  );
 
}
