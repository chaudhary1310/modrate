import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
function Header() {
  return (
    <div className='bg-gray-700 text-white flex justify-between items-center h-12 px-4'>
      <div className='flex gap-3 item-center'>
        <Image src = {'/logo.svg'} alt='logo' width ={30} height = {30}/> 
     
        <h2 className='font-bold text-xl'>modrate.lol</h2>
      </div>
      <div className='flex gap-3 itme-center'>
        <Link href={'/Dashboard'}>
        <Button className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Dashboard</Button>
        </Link>
        <UserButton/>
      </div>
    </div>
  )
}

export default Header
