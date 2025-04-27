'use client'
import React from 'react'
import AddIcon from  '@mui/icons-material/Add';
import Link from 'next/link';

const Buttons = () => {
  return (
    <div className='justify-content:flex-end '>
      <Link className='btn btn-primary' href="/addform">
      <AddIcon /> 
      </Link>
      
    </div>
  )
}

export default Buttons
