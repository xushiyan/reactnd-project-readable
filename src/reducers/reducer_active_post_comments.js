import _ from 'lodash';
import {
    GET_POST_COMMENTS, UPDATE_POST_COMMENT_VOTE_SCORE,
    UPDATE_POST_COMMENT, DELETE_POST_COMMENT, ADD_POST_COMMENT,
} from '../actions/actions_comments';
import { CLEAR_ACTIVE_POST } from '../actions/actions_posts';


export default (state = {}, action) => {
    switch (action.type) {
        case CLEAR_ACTIVE_POST:
            return {};
        case GET_POST_COMMENTS: {
            const commentsArray = action.payload.data;
            if (commentsArray.length === 0)
                return state;

            return _.mapKeys(commentsArray, 'id');
        }
        case ADD_POST_COMMENT: {
            const newComment = action.payload.data;
            return { ...state, [newComment.id]: newComment };
        }
        case UPDATE_POST_COMMENT: {
            const updatedComment = action.payload.data;
            return { ...state, [updatedComment.id]: updatedComment };
        }
        case UPDATE_POST_COMMENT_VOTE_SCORE: {
            const { id, voteScore } = action.payload.data;
            return { ...state, [id]: { ...state[id], voteScore } };
        }
        case DELETE_POST_COMMENT: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        default:
            return state;
    }
};
