import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../actions';
import { Link } from 'react-router-dom';

class PostsList extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    showPosts() {
        return _.map(this.props.posts, post => {
            return (
                <li className='list-group-item' key={post.id}>
                    {post.title}
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

const mapStateToProps = (state) => {
    return { posts: state.posts };
};

export default connect(mapStateToProps, { getPosts })(PostsList);
