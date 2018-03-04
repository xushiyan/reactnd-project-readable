import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';


const ROOT_URL = 'http://localhost:3001'
const AUTH_TOKEN = 'Bearer some-token'

export const getPosts = () => {
    const request = axios.get(`${ROOT_URL}/posts`, { headers: { Authorization: AUTH_TOKEN } })
    return {
        type: GET_POSTS,
        payload: request
    }
};
