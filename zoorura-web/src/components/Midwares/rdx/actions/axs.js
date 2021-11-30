import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:5000"});

//export const diariesUrl = 'http://localhost:5000/diaries';


API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})
export const getDiariesApi = () => API.get('/diaries');
export const postDiariesApi =(newDiary) => API.post('/diaries', newDiary);
export const patchDiariesApi = (id, diariesEditData) => API.patch(`/diaries/${id}`, diariesEditData);
export const deleteDiariesApi = (id) => API.delete(`/diaries/${id}`);
export const tipDiariesApi = (id, tipperData) => API.patch(`/diaries/${id}/tipDiaries`, tipperData);

export const loginApi = (formData) => API.post ('/users/login', formData);
export const registerApi = (formData) => API.post ('/users/register', formData);