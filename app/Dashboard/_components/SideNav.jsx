"use client"
import { FileVideo, PanelsTopLeft,  ShieldPlus } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
function SideNav() {
const MenuOption = [
    {
        id:1,
        name: 'Dashboard',
        path:'/Dashboard',
        icon:PanelsTopLeft
    },
     {
        id:2,
        name: 'MyCreation',
        path:'/Dashboard/create-new',
        icon:FileVideo
    },
    {
        id:3,
        name: 'Upgrade',
        path:'/upgrade',
        icon:ShieldPlus
    }
   
]

const path = usePathname();
console.log(path) 
  return (
    <div className='w-64 h-[85vh] bg-gray-600  shadow-md p-5 '>
        <div className='grid gap-2'>
      {MenuOption.map ((item ,index)=>(
        <Link href = {item.path} key = {index}>
        <div className={`flex item-center gap-3 p-3  hover:bg-purple-700 hover:text-white rounded-lg cursor-pointer ${path ==item.path&&'bg-violet-700 text-white'}`}>
            <item.icon/>
            <h2>{item.name}</h2>
            </div>
             </Link>
      ))}
      </div>
    </div>
  )
}

export default SideNav
