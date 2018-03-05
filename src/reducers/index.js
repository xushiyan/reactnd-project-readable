import { combineReducers } from 'redux';
import { PostsReducer, PostsSortConditionReducer } from './reducer_posts';
import { CategoriesReducer, SelectedCategoryReducer } from './reducer_categories';

/*
application states

posts: object with post id as keys and post as values
postsSortCondition: e.g.: { sortOrder: 'asc', sortCriterion: 'timestamp' }
categories: object with category name as keys and category as values
selectedCategory: e.g.: 'react'

*/
const rootReducer = combineReducers({
  posts: PostsReducer,
  postsSortCondition: PostsSortConditionReducer,
  categories: CategoriesReducer,
  selectedCategory: SelectedCategoryReducer,
});

export default rootReducer;
