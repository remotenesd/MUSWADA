import React from 'react';
import ReactDOM from 'react-dom';

// entry point
import { lostConnection, portDidUpdate } from './UI/helpers/globals';
import App from './app_';


import {store} from './UI/store/store';
import {Provider} from 'react-redux';

//
ReactDOM.render(
    (<h1 style={{width : '100vh', height: '100vh', textAlign: 'center', verticalAlign: 'center'}}>DEMARAGE ...</h1>)
    , 
    document.querySelector('#root'))

// awaits for the app to load the correct port
portDidUpdate.then(
    () => {
        console.log("[ROOT] RENDERING APP.");
        renderAPP();
    }
);

setInterval(() => {
    console.log("[CONNECT] CHECKING CONNECTION ====")
    lostConnection.then(() => {
        // everything works just fine
    }).catch(() => {
        console.log("NO connection. Calling rerender !!!!")
        // while we wait for backend
        renderNoConnection();
        // try to re-establish connection
        setInterval(
            () => {
                portDidUpdate.then(
                    () => {
                        // renderAPP();
                    }
                );
            }
        , 500);
    })
}, 7000);

const rootElement = (<div id="root"></div>);

let renderAPP = () => {
    // console.log("[APP] GETTING APP DATA")
    // getAppSpecific();
    
    if (document.querySelector('#root').length === 0)
    {
        document.querySelector('body').createElement(rootElement);
    }
    // console.log('re-render of app')
    // reMakeStore();
    // console.log(store.getState())
    ReactDOM.render( 
        (<Provider store={store}>
            <App />
        </Provider>)
        , 
        document.getElementById('root')
    )
}

let renderNoConnection = () => {
    // while we wait for backend
    ReactDOM.render(
        (<h1 style={{width : '100vh', height: '100vh', textAlign: 'center', verticalAlign: 'center'}}>Waiting for connection ...<br />Si le problem persiste, redemarer ou reinstaller application.</h1>)
        , 
        document.querySelector('#root'))
}

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

let rerenderAPP = () => {
    console.log("[RERENDER]")
    setTimeout(
        () => ipcRenderer.send('rerender'), 1500
    )
}

export {
    rerenderAPP
}