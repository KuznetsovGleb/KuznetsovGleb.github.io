import React, { Component } from 'react';

import Header from '../header';
import FilmListPage from '../film-list-page';
import ItemPage from '../item-page';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import './app.css';
import CinemaService from "../../services/cinema-service";

import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default class App extends Component {

    cinemaService = new CinemaService();

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="kinoafisha-app">

                        <Header/>
                        <Route path="/" exact
                               render={() => <FilmListPage getData={this.cinemaService.getAllPeople}/>}/>

                        <Route path="/people/" exact
                               render={() => <FilmListPage getData={this.cinemaService.getAllPeople}/>}/>

                        <Route path="/people/:id"
                               render={({match, location}) => {
                                   const {id} = match.params;
                                   return <ItemPage itemId={id} pathname={location.pathname}
                                                    getData={this.cinemaService.getResource}/>
                               }}/>

                        <Route path="/planets/" exact
                               render={() => {
                                   return <FilmListPage getData={this.cinemaService.getAllPlanets}/>
                               }}/>
                        <Route path="/planets/:id"
                               render={({match, location}) => {
                                   const {id} = match.params;
                                   return <ItemPage itemId={id} pathname={location.pathname}
                                                    getData={this.cinemaService.getResource}/>
                               }}/>

                        <Route path="/starships/" exact
                               render={() => {
                                   return <FilmListPage getData={this.cinemaService.getAllStarships}/>
                               }}/>
                        <Route path="/starships/:id"
                               render={({match, location}) => {
                                   const {id} = match.params;
                                   return <ItemPage itemId={id} pathname={location.pathname}
                                                    getData={this.cinemaService.getResource}/>
                               }}/>

                    </div>
                </Router>
            </Provider>
        );
    }
}
