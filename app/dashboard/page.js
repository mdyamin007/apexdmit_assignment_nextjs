import MaterialTable from '@/components/MaterialTable'
import { Button } from '@/components/ui/button'
import React from 'react'

function Dashboard() {
  return (
    <div className='max-w-[80vw] mx-10 my-20'>
        <div className='flex justify-between'>
            <h1 className='text-4xl text-blue-500 font-semibold'>Material Purchase</h1>
            <Button className="font-semibold px-6 py-6">Add Material Purchase</Button>
        </div>
        <div className='my-6'>
            <MaterialTable />
        </div>
    </div>
  )
}

export default Dashboard