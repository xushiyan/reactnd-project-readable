import _ from 'lodash';
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

    showPost(post, numComments) {
        return (
            <div>
                <button>Edit</button>
                <button>Delete</button>
                <h2>{post.title}</h2>
                <h4>Posted by {post.author}</h4>
                <p>{post.body}</p>
                <Voter businessObject={post} updateVoteScore={this.props.updatePostVoteScore} />
                <p>{post.voteScore} votes</p>
                <p>{numComments} comments</p>
            </div>
        );
    }

    render() {
        const { post, numComments } = this.props;
        if (!post)
            return <div>Loading...</div>

        return (
            <div>
                <Link to='/'>Back to All Posts</Link>
                <Link to={`/${post.category}`}>Back to Posts in {post.category}</Link>
                {this.showPost(post, numComments)}
                <CommentsList postId={post.id} />
            </div>
        );
    }
}

const mapStateToProps = ({ posts, activePostComments }, ownProps) => {
    const post = posts[ownProps.match.params.post_id];
    const numComments = _.size(activePostComments);
    return { post, numComments };
};
export default connect(mapStateToProps, { getPost, updatePostVoteScore })(PostDetail);
