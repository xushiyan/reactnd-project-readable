import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost, updatePostVoteScore } from '../actions';
import CommentsList from './comments_list';
import PostPreview from './post_preview';
import Voter from './voter';


class PostDetail extends PostPreview {
    componentDidMount() {
        const { post_id } = this.props.match.params;
        this.props.getPost(post_id);
    }

    showPost(post) {
        return (
            <div>
                <button>Edit</button>
                <button>Delete</button>
                <h2>{post.title}</h2>
                <h4>{post.author}</h4>
                <p>{post.body}</p>
                <Voter businessObject={post} updateVoteScore={this.props.updatePostVoteScore} />
                <p>{post.voteScore}</p>
                <p>{post.commentCount}</p>
            </div>
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
                {this.showPost(post)}
                <CommentsList postId={post.id} />
            </div>
        );
    }
}

const mapStateToProps = ({ posts }, ownProps) => {
    const post = posts[ownProps.match.params.post_id];
    return { post };
};
export default connect(mapStateToProps, { getPost, updatePostVoteScore })(PostDetail);
