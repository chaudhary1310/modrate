import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function EmptyState() {
  return (
    <div className='p-5 py-25 flex items-center flex-col mt-10 border-2 border-dashed'>
      <h2> You don't have any Video</h2>
      <Link href = {'/Dashboard/create-new'}>
      <Button>Create New Video</Button>
      </Link>
    </div>
  )
}

export default EmptyState
