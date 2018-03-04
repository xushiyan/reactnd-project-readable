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
        const { selected_category } = this.props;
        const categoriesArr = _.values(this.props.categories);
        categoriesArr.splice(0, 0, { name: 'All Categories', path: '' })
        return _.map(categoriesArr, category => {
            const selected = selected_category && category.name === selected_category
            return (
                <li className={`list-group-item ${selected ? 'active' : ''}`} key={category.name}>
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

export default connect(null, { getCategories })(CategoriesList);
