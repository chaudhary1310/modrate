 "use client"
import React, { useState } from 'react'
import {Textarea} from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
    } from "@/components/ui/select";
  
function SelectTopic({onUserSelect}) {
    const options = ['Custom Prompt','Random AI Story','Scary story','Bed Time Story','Motivational','Fun Facts']
  const [selectedOption,setSelectedOption] = useState();
  return (
    <div>
        <h2 className='font-bold text-2xl text-purple-700'>Content</h2>
        <p className='text-gray-500'>What is the topic of your video</p>
        <Select onValueChange={(value)=>{setSelectedOption(value)
        value!= 'Custom Prompt'&&onUserSelect('topic',value)
           }}>
  <SelectTrigger className="w-full mt-2 p-6 text-lg">
    <SelectValue placeholder="Content Type" />
  </SelectTrigger>
  <SelectContent>
    {options.map((item)=>(
          <SelectItem key={item || index} value={item}> {/* Added key prop */}
          {item}
        </SelectItem>
    ))}
   
    
  </SelectContent>
</Select>

{
    selectedOption =='Custom Prompt'&&
    <Textarea className='mt-3'
    onChange={(e)=>onUserSelect('topic',e.target.value)}
     placeholder = 'write prompt on which you want to generate video'/>
}

    </div>
  )
}

export default SelectTopic
