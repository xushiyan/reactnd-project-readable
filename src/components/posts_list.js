import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../actions';
import { Link } from 'react-router-dom';

class PostPreview extends Component {
    onClickEdit() {

    }

    onClickDelete() {

    }

    render() {
        const { post } = this.props;
        return (
            <div>
                <button>Edit</button>
                <button>Delete</button>
                <Link to={`/${post.category}/${post.id}`} className='btn btn-link'>{post.title}</Link>
                <h4>{post.author}</h4>
                <button>up</button>
                <button>down</button>
                <p>{post.voteScore}</p>
                <p>{post.commentCount}</p>
            </div>
        );
    }
}

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
