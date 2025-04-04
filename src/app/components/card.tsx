"use client"
import React, { useEffect, useState } from 'react';
import styles from './card.module.css'; // Ensure you have this CSS file
import DeleteIcon from '@mui/icons-material/Delete';

interface Image {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const AddDress = () => {
 const [images, setImages]= useState<Image[]>([]);
 useEffect(()=>{
    const fetchImages=async () =>{
      try{
        const res = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data:Image[]= await res.json();
        setImages(data);} catch(error){
          console.error(error);          
        }
      };
      fetchImages();
    },[]);

    const handleDelete = async (id : number)=>{
      try{
      const res= await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`,{
          method:"DELETE",
        });
       if(!res.ok){
        throw new Error('this is my ${id');
       }
       console.log(`delete image with id ${id}`)

       setImages((prevImages)=> prevImages.filter((img)=>img.id !==id))
      }catch(error){
        console.error("error ",error);
      }
    };

  return (
    <div className=' p-4 flex flex-wrap gap-6 justify-center'>
      {images.map((img) => (
        <div key={img.id} className={styles.card}>
          <img src={img.thumbnailUrl} alt={img.title} className="w-full rounded-xl" />
          <div className="pt-2">
            <h2 className="text-2xl font-roboto">{img.title}</h2>
            <h4 className='text-sm font-roboto text-gray-500'>Date</h4>
            <button  onClick={()=> handleDelete(img.id) } className="bg-red-500 hover:bg-red-700 text-white font-bold cursor-pointer ">
              <DeleteIcon /> </button>
          </div>
        </div>
      ))}

    </div>
  );
};

export default AddDress;
