import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost, updatePostVoteScore } from '../actions';
import CommentsList from './comments_list';


class _PostPreview extends Component {
    onClickEdit() {

    }

    onClickDelete() {

    }

    onClickChangeVoteScore(event) {
        const { post } = this.props;
        this.props.updatePostVoteScore(post.id, event.target.value);
    }

    showPost(post) {
        return (
            <div>
                <button>Edit</button>
                <button>Delete</button>
                <Link to={`/${post.category}/${post.id}`} className='btn btn-link'>{post.title}</Link>
                <h4>{post.author}</h4>
                <button onClick={this.onClickChangeVoteScore.bind(this)} value='upVote'>↑</button>
                <button onClick={this.onClickChangeVoteScore.bind(this)} value='downVote'>↓</button>
                <p>{post.voteScore}</p>
                <p>{post.commentCount}</p>
            </div>
        );
    }

    render() {
        const { post } = this.props;
        if (!post)
            return <div>Loading post...</div>

        return this.showPost(post);
    }
}

export const PostPreview = connect(null, { updatePostVoteScore })(_PostPreview);


class _PostDetail extends _PostPreview {
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
                <button onClick={this.onClickChangeVoteScore.bind(this)} value='upVote'>↑</button>
                <button onClick={this.onClickChangeVoteScore.bind(this)} value='downVote'>↓</button>
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
                {this.showPost(post)}
                <CommentsList postId={post.id}/>
            </div>
        );
    }
}

const mapStateToProps = ({ posts }, ownProps) => {
    const post = posts[ownProps.match.params.post_id];
    return { post };
};
export const PostDetail = connect(mapStateToProps, { getPost, updatePostVoteScore })(_PostDetail);
