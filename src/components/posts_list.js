import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getPosts, changeSortOrder, changeSortCondition, changePostVoteScore,
    VOTE_SCORE, TIMESTAMP, DEFAULT_SORT_ORDER, SORT_ORDERS
} from '../actions';
import { Link } from 'react-router-dom';

class _PostPreview extends Component {
    onClickEdit() {

    }

    onClickDelete() {

    }

    onClickChangeVoteScore(event) {
        const change = parseInt(event.target.value);
        const { post } = this.props;
        const newVoteScore = post.voteScore + change;
        this.props.changePostVoteScore(post.id, newVoteScore);
    }

    render() {
        const { post } = this.props;
        return (
            <div>
                <button>Edit</button>
                <button>Delete</button>
                <Link to={`/${post.category}/${post.id}`} className='btn btn-link'>{post.title}</Link>
                <h4>{post.author}</h4>
                <button onClick={this.onClickChangeVoteScore.bind(this)} value='1'>↑</button>
                <button onClick={this.onClickChangeVoteScore.bind(this)} value='-1'>↓</button>
                <p>{post.voteScore}</p>
                <p>{post.commentCount}</p>
            </div>
        );
    }
}

const PostPreview = connect(null, { changePostVoteScore })(_PostPreview);


class PostsList extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    onClickSort(event) {
        const clickedSortProperty = event.target.value;
        const { sortOrder, sortProperty } = this.props;
        if (clickedSortProperty === sortProperty) {
            const newSortOrder = SORT_ORDERS[(SORT_ORDERS.indexOf(sortOrder) + 1) % SORT_ORDERS.length];
            this.props.changeSortOrder(newSortOrder);
        } else {
            this.props.changeSortCondition(clickedSortProperty, DEFAULT_SORT_ORDER);
        }
    }

    showPosts() {
        const { selectedCategory } = this.props;
        const posts = (
            selectedCategory
                ? _.filter(this.props.posts, p => { return p.category === selectedCategory })
                : this.props.posts
        );
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
                <div className='btn-toolbar'>
                    <div className='btn-group' role='group'>
                        <button className='btn btn-secondary'
                            onClick={this.onClickSort.bind(this)}
                            value={VOTE_SCORE}>
                            {VOTE_SCORE}
                        </button>
                        <button className='btn btn-secondary'
                            onClick={this.onClickSort.bind(this)}
                            value={TIMESTAMP}>
                            {TIMESTAMP}
                        </button>
                    </div>
                    <Link className='btn btn-primary' to='/posts/edit'>New Post</Link>
                </div>
                <ul className='list-group'>
                    {this.showPosts()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = ({ posts, selectedCategory, postsSortCondition }) => {
    const { sortOrder, sortProperty } = postsSortCondition;
    const sortedPosts = _.orderBy(posts, [sortProperty], [sortOrder]);
    return {
        posts: sortedPosts,
        selectedCategory: selectedCategory,
        sortOrder: sortOrder,
        sortProperty: sortProperty,
    };
};
export default connect(mapStateToProps, {
    getPosts,
    changeSortOrder,
    changeSortCondition
})(PostsList);
