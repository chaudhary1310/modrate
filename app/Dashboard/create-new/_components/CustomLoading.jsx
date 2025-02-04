import React from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
  
function CustomLoading({loading}) {
  return (
    <AlertDialog open={loading} >
  
  <AlertDialogContent classname='bg-white' >
   <div className='bg-white flex flex-col item-center my-10 justify-center'>
    <Image src = {'/progress.gif'} alt='progress' width = {100} height ={100} />
    <h2>Please Wait....</h2>
   </div>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default CustomLoading
