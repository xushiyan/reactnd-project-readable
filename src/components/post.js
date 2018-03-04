import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost, getPostComments } from '../actions';

class PostDetail extends Component {
    componentDidMount() {
        const { post_id } = this.props.match.params;
        this.props.getPost(post_id);
        this.props.getPostComments(post_id);
    }

    onClickEditPost() {

    }

    onClickDeletePost() {

    }

    onClickEditComment() {

    }

    onClickDeleteComment() {

    }

    showPost() {
        const { post } = this.props;
        if (!post)
            return <div>Loading post...</div>
        return (
            <div>
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

    showComments() {
        const { comments } = this.props;
        return (
            <ul className='list-group'>
                {_.map(comments, comment => {
                    return (
                        <li className='list-group-item' key={comment.id}>
                            {comment.body}
                        </li>
                    );
                })}
            </ul>
        );
    }

    render() {
        const { post } = this.props;
        if (!post)
            return <div>Loading...</div>

        return (
            <div>
                <Link to='/'>Back to All Posts</Link>
                <Link to={`/${post.category}`}>Back to Posts in {post.category}</Link>
                {this.showPost()}
                {this.showComments()}
            </div>
        );
    }
}

const mapStateToProps = ({ posts }, ownProps) => {
    const post = posts[ownProps.match.params.post_id];
    return {
        post: post,
        comments: post && post.hasOwnProperty('comments') ? _.values(post.comments) : null
    };
};
export default connect(mapStateToProps, { getPost, getPostComments })(PostDetail);

