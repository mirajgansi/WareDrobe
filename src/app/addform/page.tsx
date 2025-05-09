'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utlis/api';

const AddForm = () => {
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [Newdress, setDress] = useState({
    name: '',
    date: '',
    comment: '',
    category: '',
    season: '',
    brand: '',
    occasion: '',
    last_worn_date: '',
    times_worn: '',
    favorite: '',
    dressimage: '',
  });

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl); // For preview
      setDress((prev) => ({
        ...prev,
        dressimage: imageUrl, // Save the preview URL
      }));
    }
  };
  
const seasons=["Summer", "Winter"];
  
  const handelSeasonSelection= (season)=>{
    setDress((prev)=>({
      ...prev,
      season:season,
    }))
  }

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
        formData.append("name", Newdress.name); 
      formData.append("date", Newdress.date);
      formData.append("comment", Newdress.comment);
      formData.append("season", Newdress.season);
      formData.append("brand", Newdress.brand);
      formData.append("occasion", Newdress.occasion);

  
      // Send the file itself, not the URL
      if (image) {
        formData.append("dressimage", image); // `image` is the actual file
      }
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      const response = await api.post("/Dress/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 201) {
        console.log("Dress added successfully");
        setDress({
          name: "",
          date: "",
          comment: "",
          category: "",
          season: "",
          brand: "",
          occasion: "",
          last_worn_date: "",
          times_worn: "",
          favorite: "",
          dressimage: "", 
        });
        setImage(null); 
        setPreview(null); 
      }
    } catch (error) {
      console.error("Error adding dress:", error.response ? error.response.data : error.message);
      alert("Error adding dress. Please check the console for details.");
    }
    
  };
  

  return (
    <div>
      <div className="max-w-xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">Add Your Dress</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Dress name"
            value={Newdress.name}
            onChange={handleAdd}
            className="input input-bordered w-full"
            required
          />

          <input
            type="date"
            name="date"
            value={Newdress.date}
            onChange={handleAdd}
            className="input input-bordered w-full"
            required
          />

         
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-outline m-1 w-52 justify-between">
            {Newdress.season || 'Select Season'}
            <svg className="ml-2 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.516 7.548L10 12.032l4.484-4.484-1.032-1.032L10 9.968 6.548 6.516z"/>
            </svg>
          </div>

          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            {seasons.map((s) => (
              <li key={s} onClick={() => handelSeasonSelection(s)} className="hover:bg-neutral hover:text-white cursor-pointer rounded px-2 py-1">
                {s}
              </li>
            ))}
          </ul>
        </div>


        <input
            type="text"
            name="comment"
            placeholder="Comments (*optional)"
            value={Newdress.comment}
            onChange={handleAdd}
            className="input input-bordered w-full"
          />
                  <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />

          {preview && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Preview:</p>
              <img src={preview} alt="Preview" className="w-full max-h-64 object-cover rounded-lg border" />
            </div>
          )}
          

          <button type="submit" className="btn btn-success w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
