import React, { Component } from 'react';
import PostsList from './posts_list';
import CategoriesList from './categories_list';

class Home extends Component {
    render() {
        return (
            <div>
                <CategoriesList />
                <PostsList />
            </div>
        );
    }
}

export default Home;
