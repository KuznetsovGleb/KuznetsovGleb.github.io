import React, {Component} from 'react';

import ItemList from '../item-list/item-list';

import './film-list-page.css';

export default class FilmListPage extends Component {


    render() {

        const itemList = (

                <ItemList
                    // onItemSelected={this.props.onSelectedFilm}
                    getData={this.props.getData}>
                </ItemList>
        );

        return itemList;
    }
}
