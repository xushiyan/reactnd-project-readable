import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import CategoriesReducer from './reducer_categories';

const rootReducer = combineReducers({
  posts: PostsReducer,
  categories: CategoriesReducer
});

export default rootReducer;
