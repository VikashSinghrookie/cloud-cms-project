import axios from 'axios';

const API = axios.create({
    baseURL: 'https://cloud-cms-project-1.onrender.com/api', // Points to your Node server
});

// Automatically add the Token to every request if we have one
API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

export default API;