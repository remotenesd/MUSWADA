import React from 'react';
import ReactDOM from 'react-dom';

// entry point
import App from './app_';

import store from './UI/store/store';
import {Provider} from 'react-redux';


import { globals, lostConnection, portDidUpdate } from './UI/helpers/globals';
    

// awaits for the app to load the correct port
portDidUpdate.then(
    () => {
        renderAPP();
    }
);

lostConnection.then(() => {
    // while we wait for backend
    renderNoConnection();
    // try to re-establish connection
    setInterval(
        () => {
            portDidUpdate.then(
                () => {
                    renderAPP();
                }
            );
        }
    , 2000);
})



let renderAPP = () => {
    ReactDOM.render(
        (<Provider store={store}>
            <App />
        </Provider>)
        , 
        document.querySelector('#root'))
}

let renderNoConnection = () => {
    // while we wait for backend
    ReactDOM.render(
        (<h1>Waiting for connection ...</h1>)
        , 
        document.querySelector('#root'))
}