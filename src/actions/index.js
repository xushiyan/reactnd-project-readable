import axios from 'axios';


export const http_client = axios.create({
    baseURL: 'http://localhost:3001',
});
http_client.defaults.headers.common['Authorization'] = 'Bearer sometoken';
http_client.defaults.headers.post['Content-Type'] = 'application/json';
