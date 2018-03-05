import _ from 'lodash';
import {
    GET_POSTS, GET_POST, GET_POST_COMMENTS,
    CHANGE_POST_VOTE_SCORE,
    CHANGE_SORT_ORDER, CHANGE_SORT_CONDITION,
    DEFAULT_SORT_ORDER, DEFAULT_SORT_PROPERTY
} from '../actions';

export const PostsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_POSTS:
            const postsArray = action.payload.data;
            return _.mapKeys(postsArray, 'id');
        case GET_POST:
            const post = action.payload.data;
            return { ...state, [post.id]: post };
        case GET_POST_COMMENTS:
            const commentsArray = action.payload.data;
            if (commentsArray.length === 0)
                return state;

            var postId = commentsArray[0].parentId;
            const comments = _.mapKeys(commentsArray, 'id');
            return { ...state, [postId]: { ...state[postId], comments: comments } };
        case CHANGE_POST_VOTE_SCORE:
            var postId = action.postId;
            return { ...state, [postId]: { ...state[postId], voteScore: action.newVoteScore } };
        default:
            return state;
    }
};

export const PostsSortConditionReducer = (
    state = {
        sortOrder: DEFAULT_SORT_ORDER,
        sortProperty: DEFAULT_SORT_PROPERTY
    },
    action
) => {
    switch (action.type) {
        case CHANGE_SORT_ORDER:
            return { ...state, sortOrder: action.sortOrder };
        case CHANGE_SORT_CONDITION:
            return {
                ...state,
                sortProperty: action.sortProperty,
                sortOrder: action.sortOrder
            };
        default:
            return state;
    }
};
