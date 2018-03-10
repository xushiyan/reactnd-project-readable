import axios from 'axios';

/* CRUD */
export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POST = 'GET_POST';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const ADD_POST = 'ADD_POST';
export const ADD_POST_COMMENT = 'ADD_POST_COMMENT';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_POST_COMMENT = 'UPDATE_POST_COMMENT';
export const UPDATE_POST_VOTE_SCORE = 'UPDATE_POST_VOTE_SCORE';
export const UPDATE_POST_COMMENT_VOTE_SCORE = 'UPDATE_POST_COMMENT_VOTE_SCORE';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_COMMENT = 'DELETE_POST_COMMENT';

const http_client = axios.create({
    baseURL: 'http://localhost:3001',
});
http_client.defaults.headers.common['Authorization'] = 'Bearer sometoken';
http_client.defaults.headers.post['Content-Type'] = 'application/json';

export const getPosts = () => {
    const request = http_client.get('/posts')
    return {
        type: GET_POSTS,
        payload: request
    }
};

export const getCategories = () => {
    const request = http_client.get('/categories')
    return {
        type: GET_CATEGORIES,
        payload: request
    };
};

export const getPost = (postId) => {
    const request = http_client.get(`/posts/${postId}`);
    return {
        type: GET_POST,
        payload: request
    };
};

export const getPostComments = (postId) => {
    const request = http_client.get(`/posts/${postId}/comments`);
    return {
        type: GET_POST_COMMENTS,
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

export const addPostComment = (comment) => {
    const request = http_client.post('/comments', comment);
    return {
        type: ADD_POST_COMMENT,
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

export const updatePostComment = (commentId, timestamp, body) => {
    const request = http_client.put(`/comments/${commentId}`, { timestamp, body });
    return {
        type: UPDATE_POST_COMMENT,
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

export const updatePostCommentVoteScore = (commentId, upOrDownVote) => {
    const request = http_client.post(`/comments/${commentId}`, { option: upOrDownVote });
    return {
        type: UPDATE_POST_COMMENT_VOTE_SCORE,
        payload: request
    };
};

export const deletePost = (postId) => {
    const request = http_client.delete(`/posts/${postId}`);
    return {
        type: DELETE_POST,
        payload: request
    };
};

export const deletePostComment = (commentId) => {
    const request = http_client.delete(`/comments/${commentId}`);
    return {
        type: DELETE_POST_COMMENT,
        payload: request
    };
};

/* select category */
export const SELECT_CATEGORY = 'SELECT_CATEGORY';

export const selectCategory = (category) => {
    return {
        type: SELECT_CATEGORY,
        selected: category
    };
};

/* clear active post */
export const CLEAR_ACTIVE_POST = 'CLEAR_ACTIVE_POST';

export const clearActivePost = () => {
    return {
        type: CLEAR_ACTIVE_POST
    };
};

/* sort posts */
export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER';
export const CHANGE_SORT_CONDITION = 'CHANGE_SORT_CONDITION';
export const VOTE_SCORE = 'voteScore';
export const TIMESTAMP = 'timestamp';
export const SORT_ORDERS = ['asc', 'desc'];
export const DEFAULT_SORT_ORDER = SORT_ORDERS[1];
export const DEFAULT_SORT_PROPERTY = TIMESTAMP;
export const changeSortOrder = (sortOrder) => {
    return {
        type: CHANGE_SORT_ORDER,
        sortOrder: sortOrder
    };
};

export const changeSortCondition = (sortProperty, sortOrder) => {
    return {
        type: CHANGE_SORT_CONDITION,
        sortProperty: sortProperty,
        sortOrder: sortOrder
    };
};
