import axios from 'axios';
 
const api = axios.create({
  baseURL: 'http://localhost:5000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addDress=()=>api.post("/add");
export const getAllDress=()=> api.get('/');
export const getDressByName=()=> api.get(`/name/${id}`)
export const deleteDress=()=> api.delete(`${id}`);;

export default api;