import { createStore, applyMiddleware, combineReducers, } from 'redux';
import {user} from './core/core';
import * as ActionTypes from './Actions/actionTypes';
import * as Actions from './Actions/actionCreator';
import sessionReducer from './reducers/sessionReducer';
import APIMiddleware from './reducers/apiMiddleware';
import rootReducer from './reducers/mainReducer';
import { p2pMiddleware } from './reducers/p2pMiddleware';
import { globals } from '../helpers/globals';
import registerReducer from './reducers/registerReducer';
import registerAPI from './reducers/registerAPI';

// applyMiddleware(forbiddenWordsMiddleware, APIInsertion),
let reducer;
let store;
let _programNav = '';

let programNav = (route : string) => { _programNav = route};

const reMakeStore = () => {
        console.log('>>> Called Store remake.')
        
        reducer = combineReducers(
                {sessionReducer : sessionReducer, rootReducer : rootReducer, rgReducer : registerReducer }
         );
        store = createStore(
                reducer,
                applyMiddleware(APIMiddleware, registerAPI )
        );
        // store.subscribe(() => {
        //         let state = store.getState();
        //         console.log(state.sessionReducer)
        // })
                
        // store.dispatch({type :});
}

reMakeStore();

setInterval(() => {
        // see if any changes have been perceived by API
        // store.dispatch(Actions.updateRequired())
        if (_programNav !== '')
        {
                store.dispatch(Actions.setRoute(_programNav));
                _programNav = '';
        }
}, 5000)

// export default store;
export {reMakeStore, store, programNav}
export type RootState = ReturnType<typeof reducer>
