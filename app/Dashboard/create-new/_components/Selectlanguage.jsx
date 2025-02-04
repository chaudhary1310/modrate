import React from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
    } from "@/components/ui/select";
function Selectlanguage({onUserSelect}) {
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-2xl text-purple-700'>Language</h2>
        <p className='text-gray-500'> Select the Language</p>
        <Select onValueChange={(value)=>{
        value!= 'Custom Prompt'&&onUserSelect('language',value)
           }}>
  <SelectTrigger className="w-full mt-2 p-6 text-lg">
    <SelectValue placeholder="Select language" />
  </SelectTrigger>
  <SelectContent>
<SelectItem value='English'>English</SelectItem>
<SelectItem value='Hindi'>Hindi</SelectItem>
  </SelectContent>
</Select>
</div>
  )
}

export default Selectlanguage
