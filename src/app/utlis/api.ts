import axios from 'axios';
 
const api = axios.create({
  baseURL: 'http://localhost:5000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addDress=()=>api.post("/add");
export const getAllDress=()=> api.get('/');
export const updateDress=()=>api.put('/:id')
export const getDressById=()=> api.get('/:id')
export const deleteDress = (id: number) => {
  return api.delete(`/dress/${id}`);
};
export default api;