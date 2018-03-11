import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getPosts, changeSortOrder, changeSortCondition,
    addPost, deletePost, updatePost,
    VOTE_SCORE, TIMESTAMP, DEFAULT_SORT_ORDER, SORT_ORDERS
} from '../actions';
import { Link } from 'react-router-dom';
import PostPreview from './post_preview';
import PostDetail from './post_detail';
import Modal from 'react-modal';
import PostForm from './post_form';


class PostsList extends Component {
    state = {
        postFormModalOpen: false,
        editingPost: null
    }

    constructor() {
        super();
        this.openPostFormModal = this.openPostFormModal.bind(this);
        this.closePostFormModal = this.closePostFormModal.bind(this);
        this.onClickNewPost = this.onClickNewPost.bind(this);
        this.onClickSort = this.onClickSort.bind(this);
    }

    onClickNewPost(event) {
        this.openPostFormModal(null);
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

    openPostFormModal(editingPost) {
        this.setState({
            postFormModalOpen: true,
            editingPost
        });
    }

    closePostFormModal() {
        this.setState({
            postFormModalOpen: false,
            editingPost: null
        });
    }

    componentDidMount() {
        this.props.getPosts();
    }

    showPosts() {
        const { selectedCategory, deletePost } = this.props;
        const posts = (
            selectedCategory
                ? _.filter(this.props.posts, p => { return p.category === selectedCategory })
                : this.props.posts
        );
        return (
            <ul className='list-group'>
                {
                    _.map(posts, post => {
                        return (
                            <li className='list-group-item' key={post.id}>
                                <PostPreview
                                    post={post}
                                    onEditPost={this.openPostFormModal}
                                    onDeletePost={deletePost} />
                            </li>
                        );
                    })
                }
            </ul>
        );
    }

    render() {
        const { sortProperty, sortOrder } = this.props;
        const { postFormModalOpen, editingPost } = this.state;
        return (
            <div>
                <div className='btn-toolbar'>
                    <h3>Sort by {sortProperty} {sortOrder === 'asc' ? '↑' : '↓'}</h3>
                    <div className='btn-group' role='group'>
                        <button className='btn btn-secondary'
                            onClick={this.onClickSort}
                            value={VOTE_SCORE}>
                            {VOTE_SCORE}
                        </button>
                        <button className='btn btn-secondary'
                            onClick={this.onClickSort}
                            value={TIMESTAMP}>
                            {TIMESTAMP}
                        </button>
                    </div>
                    <button className='btn btn-primary' onClick={this.onClickNewPost}>New Post</button>
                    <Modal
                        isOpen={postFormModalOpen}
                        onRequestClose={this.closePostFormModal}
                        contentLabel='Add or Edit post'
                        ariaHideApp={false}>
                        <PostForm post={editingPost} doneSubmit={this.closePostFormModal} />
                    </Modal>
                    {this.showPosts()}
                </div>
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
    changeSortCondition,
    addPost, deletePost, updatePost,
})(PostsList);
