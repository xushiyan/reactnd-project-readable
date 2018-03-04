import React, { Component } from 'react';
import PostsList from './posts_list';
import CategoriesList from './categories_list';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        const { posts, categories, selected_category } = this.props;
        return (
            <div>
                <CategoriesList categories={categories} selected_category={selected_category} />
                <PostsList posts={posts} selected_category={selected_category} />
            </div>
        );
    }
}

const mapStateToProps = ({ posts, categories }, ownProps) => {
    return {
        posts: posts,
        categories: categories,
        selected_category: ownProps.match.url === '/' ? null : ownProps.match.params.category
    }
};
export default connect(mapStateToProps, null)(Home);
