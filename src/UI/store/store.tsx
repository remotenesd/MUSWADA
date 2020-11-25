import { createStore, applyMiddleware, combineReducers, } from 'redux';
import {user} from './core/core';
import * as ActionTypes from './Actions/actionTypes';
import * as Actions from './Actions/actionCreator';
import sessionReducer from './reducers/sessionReducer';
import APIMiddleware from './reducers/apiMiddleware';
import rootReducer from './reducers/mainReducer';
import { APIInsertion, forbiddenWordsMiddleware } from './reducers/todoMiddlewares';
import { p2pMiddleware } from './reducers/p2pMiddleware';
import { globals } from '../helpers/globals';

// applyMiddleware(forbiddenWordsMiddleware, APIInsertion),
let reducer;
let store;


const reMakeStore = () => {
        if (globals.apiPort === 5001)
        {
                return;
        }
        console.log('>>> Called Store remake.')
        
        reducer = combineReducers(
                {sessionReducer : sessionReducer, rootReducer : rootReducer }
         );
        store = createStore(
                reducer,
                applyMiddleware(APIMiddleware, forbiddenWordsMiddleware, APIInsertion, p2pMiddleware)
        );
                
        // store.dispatch({type :});
        store.dispatch({type : ActionTypes.GET_TODOS});
}

reMakeStore();

setInterval(() => {
        // see if any changes have been perceived by API
        store.dispatch(Actions.updateRequired())
}, 5000)

// export default store;
export {reMakeStore, store}