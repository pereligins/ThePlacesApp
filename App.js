import React from 'react';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducer';
import { init } from './helpers/db';

init()
    .then(() => {
    console.log('Initilized database succesful');
}).catch(err => {
    console.log('Initilizing db faled');
    console.log(err);
})

const rootReducer = combineReducers({
    places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
    return (<Provider store={store}>
        <PlacesNavigator/>
    </Provider>);
}
