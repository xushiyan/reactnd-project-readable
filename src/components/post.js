import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from '../actions';

class _PostPreview extends Component {
    componentDidMount() {

    }

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
const PostPreview = connect(null, null)(_PostPreview);

class _PostDetail extends Component {
    componentDidMount() {
        const { post_id } = this.props.match.params;
        this.props.getPost(post_id);
    }

    onClickEdit() {

    }

    onClickDelete() {

    }

    render() {
        const { post } = this.props;
        if (!post)
            return <div>Loading...</div>

        return (
            <div>
                <Link to='/'>Back to All Posts</Link>
                <Link to={`/${post.category}`}>Back to Posts in {post.category}</Link>
                <button>Edit</button>
                <button>Delete</button>
                <h2>{post.title}</h2>
                <h4>{post.author}</h4>
                <p>{post.body}</p>
                <button>up</button>
                <button>down</button>
                <p>{post.voteScore}</p>
                <p>{post.commentCount}</p>
            </div>
        );
    }
}
const mapStateToProps = ({ posts }, ownProps) => {
    return { post: posts[ownProps.match.params.post_id] };
};
const PostDetail = connect(mapStateToProps, { getPost })(_PostDetail);

export { PostPreview, PostDetail };
