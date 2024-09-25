"use client";
import MaterialPurchaseModal from '@/components/MaterialPurchaseModal';
import MaterialTable from '@/components/MaterialTable'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

function Dashboard() {
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <>
      <div className='max-w-[80vw] mx-10 my-20'>
        <div className='flex justify-between'>
          <h1 className='text-4xl text-primary font-semibold'>Material Purchase</h1>
          <Button className="font-semibold px-6 py-6" onClick={() => setOpenAddModal(true)}>Add Material Purchase</Button>
        </div>
        <div className='my-6'>
          <MaterialTable />
        </div>
      </div>
      {openAddModal && (
       <div className="fixed inset-0 z-50 flex items-center justify-center">
         <MaterialPurchaseModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
        </div> 
      )}
    </>
  )
}

export default Dashboard