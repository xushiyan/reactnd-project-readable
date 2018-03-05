import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../actions';
import { Link } from 'react-router-dom';

class CategoriesList extends Component {
    componentDidMount() {
        this.props.getCategories();
    }

    showCategories() {
        const categories = [{ name: 'All Categories', path: '' }, ...this.props.categories];
        const { selectedCategory } = this.props;
        return _.map(categories, category => {
            const selected = selectedCategory && category.name === selectedCategory
            return (
                <li className={`list-group-item ${selected ? 'active' : ''}`} key={category.path}>
                    <Link to={`/${category.path}`}>
                        {category.name}
                    </Link>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <ul className='list-group'>
                    {this.showCategories()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = ({ categories, selectedCategory }) => {
    return {
        categories: _.values(categories),
        selectedCategory: selectedCategory
    };
};
export default connect(mapStateToProps, { getCategories })(CategoriesList);
