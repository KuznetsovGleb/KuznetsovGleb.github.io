import React, {Component} from 'react';

import './item-page.css';
import Spinner from "../spinner/spinner";

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../app/actions';

class ItemPage extends Component {

    componentDidMount() {
        const {getData, pathname} = this.props;
        const lastSymbol = pathname.indexOf('/', 1);
        this.location = pathname.slice(1, lastSymbol);
        const newPath = pathname.slice(1);

        this.props.fetchSwapi(getData, undefined, newPath);

        // getData(newPath)
        //     .then((itemPage) => {
        //         this.props.show(itemPage);
        //     });
    }

    componentWillUnmount() {
        this.props.del();
    }

    renderItem(itemPage) {
        const {name} = itemPage;

        switch (this.location) {
            case 'people':
                const {height, skin_color, mass, eye_color, gender, birth_year} = itemPage;
                return (
                    <div className="item-page-wrapper">
                        <div className="item-page-description">
                            <h2>{`${name}`}</h2>
                            <p className="item-page-text">{`Gender: ${gender}`}</p>
                            <p className="item-page-text">{`Birth year: ${birth_year}`}</p>
                            <p className="item-page-text">{`Height: ${height} cm`}</p>
                            <p className="item-page-text">{`Mass: ${mass} kg`}</p>
                            <p className="item-page-text">{`Skin color: ${skin_color}`}</p>
                            <p className="item-page-text">{`Eye color: ${eye_color}`}</p>
                            <p className="item-page-text">{`Eye color: ${eye_color}`}</p>
                        </div>
                    </div>
                );
            case 'planets':
                const {diameter, population, climate, rotation_period, orbital_period} = itemPage;
                return (
                    <div className="item-page-wrapper">
                        <div className="item-page-description">
                            <h2>{`${name}`}</h2>
                            <p className="item-page-text">{`Diameter: ${diameter}`}</p>
                            <p className="item-page-text">{`Population: ${population}`}</p>
                            <p className="item-page-text">{`Climate: ${climate}`}</p>
                            <p className="item-page-text">{`Mass: ${mass} kg`}</p>
                            <p className="item-page-text">{`Rotation period: ${rotation_period}`}</p>
                            <p className="item-page-text">{`Orbital period: ${orbital_period}`}</p>
                        </div>
                    </div>
                );
            case 'starships':
                const {model, length, crew, passengers, starship_class, max_atmosphering_speed} = itemPage;
                return (
                    <div className="item-page-wrapper">
                        <div className="item-page-description">
                            <h2>{`${name}`}</h2>
                            <p className="item-page-text">{`Model: ${model}`}</p>
                            <p className="item-page-text">{`Starship class: ${starship_class}`}</p>
                            <p className="item-page-text">{`Length: ${length}`}</p>
                            <p className="item-page-text">{`Max speed: ${max_atmosphering_speed}`}</p>
                            <p className="item-page-text">{`Crew: ${crew}`}</p>
                            <p className="item-page-text">{`Passengers: ${passengers}`}</p>
                        </div>
                    </div>
                );
        }
    }

    render() {
        console.log('itemPage props', this.props);
        const {reduxState} = this.props;

        if (!reduxState.itemPage) {
            return <Spinner/>;
        }

        return this.renderItem(reduxState.itemPage);;

    }
}


const mapStateToProps = (state) => {
    console.log('state', state);
    return {
        reduxState: state
    }
};

const mapDispatchToProps = (dispatch) => {

    const { del, show, fetchSwapi } = bindActionCreators(actions, dispatch);
    return {
        fetchSwapi: (swapi, toLocalStorage, url) => {
            fetchSwapi(swapi, toLocalStorage, url)(dispatch)
        },
        del,
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);