"use client";

import React, { useEffect, useState } from 'react';
import { Dress } from '../../utlis/dress';
import api from '../../utlis/api';
import { useParams } from "next/navigation";

export default function DressDetailPage() {
  const [dress, setDress] = useState<Dress | null>(null);
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    const fetchDress = async () => {
      try {
        const response = await api.get(`dress/${id}`);
        setDress(response.data);
      } catch (error) {
        console.error("Error fetching dress:", error);
      }
    };

    if (id) fetchDress();
  }, [id]);

  // Null check to avoid errors on initial render
  if (!dress) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-xl max-w-4xl w-full grid md:grid-cols-2 gap-8 p-6">
        <div>
          <img
            src={dress.dressimage ? `http://localhost:5000/${dress.dressimage}` : "/fallback-image.png"}
            alt={dress.name}
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">{dress.name}</h2>
            <p className="text-gray-700 text-lg mb-4">{dress.comment}</p>
            <p className="text-xl font-semibold text-indigo-600">{dress.season}</p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <button className={`btn ${dress.favorite ? "btn-warning" : "btn-primary"}`}>
              {dress.favorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            <button className="btn btn-outline">Go Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
