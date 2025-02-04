"use client"
import { Button } from '@/components/ui/button'
import React, {useEffect, useState} from 'react'
import EmptyState from './_components/EmptyState';
import { eq } from 'drizzle-orm';
import { db } from '@/configs/db';
import VideoList from './_components/VideoList';
import {VideoData} from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';


function Dashboard() {
  const [videoList,setVideoList] = useState([]);
 const {user} = useUser();
  useEffect(()=>{
    user&&GetVideoList();
  },[user])

 const GetVideoList=async()=>{
  const result = await db.select().from(VideoData)
  .where(eq(VideoData?.createdBy,user?.primaryEmailAddress?.emailAddress));
  console.log(result);
  setVideoList(result);
 }

  return (
    <div>
     <div className='flex justify-between items-center'>
      <h2 className='font-bold text-2xl text-purple-700 '>Dashboard</h2>
      <Link  href ={'/Dashboard/create-new'}>
     <Button> +Create New</Button>
     </Link>
     </div>
     {/* Empty state */}
     {videoList?.length==0&&<div>
      <EmptyState/>
     </div>}
     {/*List of video*/}
<VideoList videoList={videoList} />
    </div>
  )
}

export default Dashboard
