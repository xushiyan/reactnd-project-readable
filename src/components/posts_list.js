import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../actions';
import { Link } from 'react-router-dom';
import { PostPreview } from './post';

class PostsList extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    showPosts() {
        const { posts } = this.props;
        return _.map(posts, post => {
            return (
                <li className='list-group-item' key={post.id}>
                    <PostPreview post={post} />
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <button className='btn btn-secondary'>Sort by score</button>
                <button className='btn btn-secondary'>Sort by timestamp</button>
                <Link className='btn btn-primary' to='/posts/edit'>
                    New Post
                </Link>
                <h1>All Posts</h1>
                <ul className='list-group'>
                    {this.showPosts()}
                </ul>
            </div>
        );
    }
}

export default connect(
    ({ posts }) => { return { posts }; },
    { getPosts }
)(PostsList);
