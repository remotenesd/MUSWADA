import { createStore, applyMiddleware, combineReducers, } from 'redux';
import {user} from './core/core';
import * as ActionTypes from './Actions/actionTypes';
import * as Actions from './Actions/actionCreator';
import sessionReducer from './reducers/sessionReducer';
import APIMiddleware from './reducers/apiMiddleware';
import rootReducer from './reducers/mainReducer';
import { APIInsertion, forbiddenWordsMiddleware } from './reducers/todoMiddlewares';

// applyMiddleware(forbiddenWordsMiddleware, APIInsertion),
const reducer = combineReducers(
                       {sessionReducer : sessionReducer, rootReducer : rootReducer }
                );
const store = createStore(
                    reducer,
                    applyMiddleware(APIMiddleware, forbiddenWordsMiddleware, APIInsertion)
            );

// store.dispatch({type :});
store.dispatch({type : ActionTypes.GET_TODOS});

export default store;