"use client";
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import api, { deleteDress } from '../utlis/api';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AlertMessage from './alertMessage';
import { Warning } from '@mui/icons-material';

type Dress = {
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

  useEffect(() => {
    const fetchDress = async () => {
      try {
        const response = await api.get("dress/");
        setDresses(response.data);
      } catch (error) {
        console.log("Error fetching Dresses");
      }
    };
    fetchDress();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteDress(id);
      if (!res) throw new Error(`Error deleting dress with id: ${id}`);

      setDresses(prev => prev.filter(dress => dress.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const toggleFavorite = async (id: number, currentFavorite: boolean | undefined) => {
    const updatedFavorite = !currentFavorite;

    try {
      const formData = new FormData();
      formData.append("favorite", updatedFavorite.toString());
      
      await api.put(`/dress/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update local state
      setDresses(prev =>
        prev.map(dress =>
          dress.id === id ? { ...dress, favorite: updatedFavorite } : dress
        )
      );
      if(currentFavorite){
          setAlertType('warning');
          setAlertMessage('Dress is removed from favorite!')
      }
      else{
        setAlertType('success');
        setAlertMessage('Dress is marked as favorite!')      
      }
      setshowSuccess(true)
      
      setTimeout(()=>setshowSuccess(false),3000);
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  const [showSuccess, setshowSuccess]=useState(false);
  const[alertType,setAlertType]=useState<'success'|'warning'>('success');
  const[alertMessage, setAlertMessage]=useState('');

  return (
    <div>
    <div className='p-4 flex flex-wrap gap-6 justify-center'>
      {dresses.map((dress) => (
        <div key={dress.id} className="card card-side bg-red-900 shadow-lg rounded-lg overflow-hidden w-80">
          <figure>
            <Image
              src={dress.dressimage ? `http://localhost:5000/${dress.dressimage}` : "/fallback-image.png"}
              width={400}
              height={400}
              alt={dress.name || "Fallback Dress"}
              className="w-full rounded-xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/fallback-image.png";
              }}
            />
          </figure>
          <div className="card-body">
            <button
            className="ml-20 text-orange-400"
            onClick={() => toggleFavorite(dress.id, dress.favorite)}
            >
              {dress.favorite ? <StarIcon /> : <StarBorderIcon />}
            </button>

            <h2 className="card-title">{dress.name}</h2>
            <h4 className='text-sm font-roboto text-gray-500'>{dress.date}</h4>

            <button
              onClick={() => {
                const modal = document.getElementById(`modal-${dress.id}`) as HTMLDialogElement;
                modal?.showModal();
              }}
              className="btn btn-secondary"
            >
              <DeleteIcon />
            </button>

            <dialog id={`modal-${dress.id}`} className='modal'>
              <div className='modal-box'>
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className='font-bold text-lg'>Are you sure?</h3>
                <p className='py-4'>Press yes to delete your dress.</p>
                <div className='modal-action'>
                  <form method='dialog'>
                    <button className='btn btn-error btn-outline' onClick={() => handleDelete(dress.id)}>Yes</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      ))}
       
    </div>
    {showSuccess && <AlertMessage message={alertMessage} type={alertType}/>}

    </div>
    
  );
};

export default AddDress;
