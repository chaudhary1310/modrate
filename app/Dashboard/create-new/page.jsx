"use client"
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import Selectlanguage from './_components/Selectlanguage';
import { Button } from '@/components/ui/button';
import   axios  from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import PlayerDialog from '../_components/PlayerDialog';




function CreateNew() {
 const [formData,setFormData]= useState([]);
 const [loading,setLoading] = useState(false);
 const [audioFileUrl,setAudioFileUrl] = useState();
 const [videoScript,setVideoScript] = useState();
 const[captions,setCaptions]=useState();
 const[imageList,setImageList] = useState();
 const{videoData,setVideoData} = useContext(VideoDataContext);
 const[playVideo,setPlayVideo]= useState(false);
 const[videoId,setVideoId]= useState();
 const{user}=useUser()
 


  const onHandleInputChange =(fieldName,fieldValue)=>{
    console.log(fieldName,fieldValue)
  setFormData(prev=>({
    ...prev,
    [fieldName]:fieldValue
 }))
}
  const onCreateClickHandler = ()=>{
       GetVideoScript();

  }



//Get Video Script
const GetVideoScript=async()=>{
  setLoading(true)
 const prompt = 'Write a script '+formData.Duration+' seconds video on topic '+formData.topic+' along with AI image prompt in '+formData.imageStyle+' format for each scene with '+formData.language+' and give me result in JSON format with imagePrompt and ContextText as Field,No Plain Text';

  const  resp = await axios.post('/api/get-video-script',{
       prompt:prompt
   });
   if(resp.data.result){
    setVideoData(prev=>({
    ...prev,
    'videoScript':resp.data.result
    }))
   setVideoScript(resp.data.result);
    GenerateAudioFile(resp.data.result)
    
  }
   
  };
  

 
/**
 * generate audio file and save
 * @param {*} videoScriptData 
 */


const GenerateAudioFile = async(videoScriptData)=>{
  setLoading(true)
  let script ='';
  const id = uuidv4();
 videoScriptData.forEach(item => {
  script = script + item.ContextText + ' ';
    console.log(script)
  })
  const resp = await axios.post('/api/generate-audio',{
  text:script,
  id:id
 
 });console.log(resp.data.result)
 
  setVideoData(prev=>({
  ...prev,
  'audioFileUrl':resp.data.result
  }))
 setAudioFileUrl(resp.data.result);
 resp.data.result && await GenerateAudioCaption(resp.data.result,videoScriptData)
}


 

/**
 * used to generate caption
 * @param {*} fileUrl 
 */

const GenerateAudioCaption=async(fileUrl,videoScriptData)=>{
 setLoading(true);
  const resp = await axios.post('/api/generate-caption',{
 audioFileUrl:fileUrl

 })
  
  setCaptions(resp?.data?.result);
  
    setVideoData(prev=>({
    ...prev,
    'captions':resp.data.result
    }))
 
  resp.data.result&& await GenerateImage(videoScriptData);
}
 


/**
 * used to generate AI image
 */

const GenerateImage=async(videoScriptData)=>{

   let images=[];
  for (const element of videoScriptData){
    try{
const resp =await axios.post('/api/generate-image',{
        prompt:element.imagePrompt
      });
      console.log(resp.data.result);
      images.push(resp.data.result);

    }catch(e)
    {
      console.log('Error:'+e);
      
    }
  }

    setVideoData(prev=>({
    ...prev,
    'imageList':images
    }))
  


  setImageList(images)
  setLoading(false);

}

useEffect(()=>{
 console.log(videoData);
 if(Object.keys(videoData).length==4)
 {
  SaveVideoData(videoData);
 }
},[videoData])


const SaveVideoData= async(videoData)=>{
  setLoading(true)

  const result = await db.insert(VideoData).values({
    script:videoData?.videoScript,
    audioFileUrl:videoData?.audioFileUrl,
    captions:videoData?.captions,
    imageList:videoData?.imageList,
    createdBy:user?.primaryEmailAddress?.emailAddress

  }).returning ({id:VideoData?.id})
 setVideoId(result[0].id);
 setPlayVideo(true);
 console.log(result);
 setLoading(false);
}



  return (
    <div className='md:px-20'>
     <h2 className='font-bold text-4xl text-purple-700 text-center'>Create New</h2>

<div className='mt-10 shadow-md'>
    {/* Slect Topic */}
<SelectTopic onUserSelect={onHandleInputChange} />
    {/* Select style*/}

<SelectStyle onUserSelect={onHandleInputChange}/>
{/* Duration */}
<SelectDuration onUserSelect={onHandleInputChange}/>
{/* language */}
<Selectlanguage onUserSelect={onHandleInputChange}/>

<Button className = 'mt-10 w-full text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'onClick={onCreateClickHandler} >Generate Video</Button>




</div>
<CustomLoading loading = {loading}/>
<PlayerDialog playVideo = {playVideo} videoId={videoId} />
    </div>
  )
}

export default CreateNew
