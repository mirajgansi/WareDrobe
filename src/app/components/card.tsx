"use client"
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../utlis/api';

type  Dress = {
  id: number;
  name: string;
  date: string;
  comment?: string;
  category?: string;
  season?: string;
  brand?: string;
  occasion?: string;
  last_worn_date?: string;
  times_worn?: number;
  favorite?: boolean;
  dressimage: string;
};

const AddDress = () => {
  const [dresses, setDresses] = useState<Dress[]>([]);
 useEffect(()=>{
  const fetchDress= async ()=> {
    try{
    const response = await api.get("dress/");
    setDresses( response.data);
  }
  catch(error){
    console.log("Error fetching Dresses")
  }
  };
  fetchDress();
 },[]);

    // const handleDelete = async (id : number)=>{
    //   try{
    //     alert
    //   const res= await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`,{
    //       method:"DELETE",
    //     });
    //    if(!res.ok){
    //     throw new Error('this is my ${id');
    //    }
    //    console.log(`delete image with id ${id}`)

    //    setDress((prevImages)=> prevImages.filter((img)=>img.id !==id))
    //   }catch(error){
    //     console.error("error ",error);
    //   }
    // };

  return (
    <div className=' p-4 flex flex-wrap gap-6 justify-center '>
      {dresses.map((dress)=>(
        <div key={dress.name} className="card card-side bg-red-100 shadow-sm'">
          <img src={`http://localhost:3000/${dress.dressimage}`} alt={dress.name} className="w-full rounded-xl" />
          <div className="card-body">
            <h2 className="card-title">{dress.name}</h2>
            <h4 className='text-sm font-roboto text-gray-500'>{dress.date}</h4>
            
            <button  onClick={()=>{const modal=document.getElementById(`img.id.toString()`)as HTMLDialogElement;
            modal?.showModal();
          console.log("hi")}}
             className="btn btn-secondary"><DeleteIcon/> </button>
              <dialog id={`img.id.toString()`}className='modal' >
                <div className='modal-box'>
                <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>                  <h3 className='font-bold text-lg'> Are you sure?</h3>
                  <p className='py-4'>press yes to delete your dress</p>
                  <div className='modal-action'>
                    <form method='dialog'>
                      {/* <button className='btn btn-error btn-outline  ' onClick={()=>handleDelete(img.id) }>yes</button> */}
           </form>
                  </div>
                </div>
              </dialog>

          </div>
        </div>
))}
    </div>
  );
};

export default AddDress;
