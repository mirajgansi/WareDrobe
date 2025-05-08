'use client';
import { Message } from '@mui/icons-material';
import React from 'react'


type AlertProps ={
    message: string;
    type?: "success" | "error" | "info" | "warning";
    onUndo?: () => void;
  };
const alertTypeClasses: Record<string, string>={
    success: 'bg-green-100 border border-green-400 text-green-700',
    error: 'bg-red-100 border border-red-400 text-red-700',
    info: 'bg-blue-100 border border-blue-400 text-blue-700',
    warning: 'bg-yellow-100 border border-yellow-400 text-yellow-700',
    }    


const AlertMessage=({message, type="success",onUndo}: AlertProps)=>{
  return (
    <div className="fixed bottom-4 right-4 z-50">
    <div role="alert" className={`alert ${alertTypeClasses[type]} w-fit shadow-lg`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{message}</span>
      <button className="btn btn-sm" onClick={onUndo}>Undo</button>
    </div>
  </div>
  
  )
}

export default AlertMessage