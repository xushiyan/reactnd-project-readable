import { http_client } from '.';


export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_POST_VOTE_SCORE = 'UPDATE_POST_VOTE_SCORE';
export const DELETE_POST = 'DELETE_POST';

export const getPosts = () => {
    const request = http_client.get('/posts')
    return {
        type: GET_POSTS,
        payload: request
    }
};

export const getPost = (postId) => {
    const request = http_client.get(`/posts/${postId}`);
    return {
        type: GET_POST,
        payload: request
    };
};

export const addPost = (post) => {
    const request = http_client.post('/posts', post);
    return {
        type: ADD_POST,
        payload: request
    };
};

export const updatePost = (postId, title, body) => {
    const request = http_client.put(`/posts/${postId}`, { title, body });
    return {
        type: UPDATE_POST,
        payload: request
    };
};

export const updatePostVoteScore = (postId, upOrDownVote) => {
    const request = http_client.post(`/posts/${postId}`, { option: upOrDownVote });
    return {
        type: UPDATE_POST_VOTE_SCORE,
        payload: request
    };
};

export const deletePost = (postId, callback = () => { }) => {
    const request = http_client.delete(`/posts/${postId}`).then(() => callback());
    return {
        type: DELETE_POST,
        payload: postId
    };
};

/* clear active post */
export const CLEAR_ACTIVE_POST = 'CLEAR_ACTIVE_POST';

export const clearActivePost = () => {
    return {
        type: CLEAR_ACTIVE_POST
    };
};