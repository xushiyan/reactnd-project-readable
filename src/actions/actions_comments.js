import { http_client } from '.';


export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const ADD_POST_COMMENT = 'ADD_POST_COMMENT';
export const UPDATE_POST_COMMENT = 'UPDATE_POST_COMMENT';
export const UPDATE_POST_COMMENT_VOTE_SCORE = 'UPDATE_POST_COMMENT_VOTE_SCORE';
export const DELETE_POST_COMMENT = 'DELETE_POST_COMMENT';

export const getPostComments = (postId) => {
    const request = http_client.get(`/posts/${postId}/comments`);
    return {
        type: GET_POST_COMMENTS,
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

export const updatePostComment = (commentId, timestamp, body) => {
    const request = http_client.put(`/comments/${commentId}`, { timestamp, body });
    return {
        type: UPDATE_POST_COMMENT,
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

export const deletePostComment = (commentId) => {
    const request = http_client.delete(`/comments/${commentId}`);
    return {
        type: DELETE_POST_COMMENT,
        payload: commentId
    };
};
