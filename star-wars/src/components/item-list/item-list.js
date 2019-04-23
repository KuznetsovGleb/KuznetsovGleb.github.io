import React, {Component} from 'react';

import './item-list.css';
import Spinner from "../spinner/spinner";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../app/actions';
import {CSSTransitionGroup} from "react-transition-group";

class ItemList extends Component {

    componentDidMount() {
        console.log('componentDidMount function!')

        const {getData, location} = this.props;
        this.location = location.pathname.replace(new RegExp("/", 'g'), '');
        const returnObj = JSON.parse(localStorage.getItem(this.location));

        if (!returnObj) {

            this.props.fetchSwapi(getData, this.setToLocalStorage.bind(this));
            // getData()
            //     .then((itemList) => {
            //         this.props.set(itemList);
            //         this.setToLocalStorage();
            //     });
        } else {
            this.props.set(returnObj)
        }
    }

    componentWillUnmount() {
        this.props.del();
    }

    setToLocalStorage() {
        clearTimeout(this.storageTimer);

        let serialObj = JSON.stringify(this.props.reduxState.itemList);

        localStorage.setItem(this.location, serialObj);

        this.removeFromLocalStorage();
    }

    removeFromLocalStorage() {
        this.storageTimer = setTimeout(() => {
            localStorage.removeItem(this.location);
        }, 60000)
    }

    showMore = async () => {

        if (this.props.reduxState.itemList.next != null) {
            const result = await fetch(this.props.reduxState.itemList.next);
            const extraItemList = await result.json();
            const newItemList = this.props.reduxState.itemList.results.concat(extraItemList.results);
            const newNext = extraItemList.next;

            this.props.set({
                results: newItemList,
                next: newNext,
            });
            this.setToLocalStorage();
        }
    };

    renderItems(arr) {
        return arr.map((item, index) => {
            const {name, url} = item;
            const id = url.match(/\d+/);
            const {history, location} = this.props;

            return (
                <li className="list-item"
                    key={index}
                    onClick={() => {
                        if (location.pathname === '/') history.push(`people/${id[0]}`);
                        history.push(`${id[0]}`);
                    }}>
                    <CSSTransitionGroup
                        transitionName="list-item-transition"
                        transitionAppear={true}
                        transitionAppearTimeout={3000}
                        transitionEnter={false}
                        transitionLeave={false}>

                        <span className="list-item-text">{`${name}`}</span>
                    </CSSTransitionGroup>
                </li>
            );
        });
    }

    render() {
        console.log('render');
        console.log("props = ", this.props);
        const {reduxState} = this.props;

        if (!reduxState.itemList) {
            return <Spinner/>;
        }

        const items = this.renderItems(reduxState.itemList.results);

        return (
            <div>
                <ul className="item-list list-group">
                    {items}
                </ul>
                {
                    reduxState.itemList.next != null ? <button onClick={this.showMore}>Show more</button> :
                        <span>That's all..</span>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('state', state);

    return {
        reduxState: state
    }
};

const mapDispatchToProps = (dispatch) => {
    const {set, del, fetchSwapi} = bindActionCreators(actions, dispatch);
    return {
        set: (payload) => set(payload),
        fetchSwapi: (swapi, toLocalStorage) => {
            fetchSwapi(swapi, toLocalStorage)(dispatch)
        },
        del,
        // fetchSwapiOld: (swapi, toLocalStorage) => fetchSwapi(swapi, toLocalStorage, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ItemList));
