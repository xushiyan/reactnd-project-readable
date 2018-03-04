import _ from 'lodash';
import { GET_POSTS } from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}
