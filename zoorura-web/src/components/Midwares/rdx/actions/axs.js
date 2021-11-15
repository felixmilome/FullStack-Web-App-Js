import axios from 'axios';

export const diariesUrl = 'http://localhost:5000/diaries';

export const getDiariesApi = () => axios.get(diariesUrl);
export const postDiariesApi =(newDiary) => axios.post(diariesUrl, newDiary);
export const patchDiariesApi = (id, diariesEditData) => axios.patch(`${diariesUrl}/${id}`, diariesEditData);
export const deleteDiariesApi = (id) => axios.delete(`${diariesUrl}/${id}`);