import _ from 'lodash';
import { GET_POSTS, GET_POST } from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        case GET_POST:
            return { ...state, [action.payload.data.id]: action.payload.data };
        default:
            return state;
    }
}
