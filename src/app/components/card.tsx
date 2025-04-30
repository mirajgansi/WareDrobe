"use client"
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import api, { deleteDress } from '../utlis/api';
import Image from 'next/image';
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

 const handleDelete = async (id: number) => {
  try {
    const res = await deleteDress(id)
    
    if (!res) {
      throw new Error(`Error deleting dress with id: ${id}`);
    }

    // On success
    console.log(`Successfully deleted dress with id: ${id}`);
    setDresses(prevDresses => prevDresses.filter(dress => dress.id !== id));
  } catch (error) {
    console.error("Error:", error);
  }

};


  return (
    <div className=' p-4 flex flex-wrap gap-6 justify-center '>
      {dresses.map((dress)=>(
        <div key={dress.id}  className="card card-side bg-red-100 shadow-lg rounded-lg overflow-hidden w-80">
           <figure>
                <Image
          src={dress.dressimage ? `http://localhost:5000/${dress.dressimage}` : "/fallback-image.png"}
          width={400} height={400}
          alt={dress.name || "Fallback Dress"}
          className="w-full rounded-xl"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/fallback-image.png";
          }}
/>
        </figure>
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
                      <button className='btn btn-error btn-outline  ' onClick={()=>handleDelete(dress.id) }>yes</button>
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
