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
        return _.map(this.props.categories, category => {
            return (
                <li className='list-group-item' key={category.name}>
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
                <h1>All Categories</h1>
                <ul className='list-group'>
                    {this.showCategories()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { categories: state.categories };
};

export default connect(mapStateToProps, { getCategories })(CategoriesList);
