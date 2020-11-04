import {user, IState} from '../core/core';
import * as ActionTypes from '../Actions/actionTypes';
import * as Actions from '../Actions/actionCreator';
import session from '../../storage/localStorage';

let emptyUser : user = new user('', '', '');

const initState : IState = {
    user : new session(),
    registeringUser : emptyUser,
    usernameExist : true,
    registerSuccess : false,
    routing : '',
}

function sessionReducer(state = initState, action) {
    if (action.type === ActionTypes.SET_LOGIN)
    {
        if (action.data.user !== null)
        {
            // successful login from middleware,
            // engage in session creation
            var ses = new session();
            ses.login(action.data.user.userID, action.data.user.name, action.data.user.password);
            return Object.assign({}, state, {
                user : ses,
            })
        }
        else {
            // no login ?? let's tell the user !
            var noLogSession = (new session());
            noLogSession.genNoLoginData();
            console.log(noLogSession);
            return Object.assign({}, state,
               { user : noLogSession,}
            )
        }
    }
    if (action.type === ActionTypes.LOGOUT)
    {
        var noLogSession = (new session());
        noLogSession.genNoLoginData();
        state.user.signOut();
        return Object.assign({}, state,
                { user : noLogSession,}
             )
    }
    if (action.type === ActionTypes.USERNAME_EXIST){
        // console.log('new -=>R>> ')
        return Object.assign({}, state, {
            usernameExist : action.data.exist,
        })
    }
    if (action.type === ActionTypes.REGISTER)
    {
        // NOTHING TO DO?
        return Object.assign({}, state,
            { 
                // user : state.user,
                registerSuccess : action.success,
            }
         )
    }

    // ROUTING AND MIX
    if (action.type === ActionTypes.SET_ROUTE)
    {
        // WHERE TO ?
        if (true) // test
        {
            // let's redirect to said route
            // console.log('!!!!' + state);
            return Object.assign({}, state,
                { 
                    // user : state.user,
                    routing : action.payload.route,
                }
            )
        }
    }

    if (action.type === ActionTypes.ERASE_ROUTE)
    {
        return Object.assign({}, state, 
            {
                routing : ''
        });
    }

    return state;
}

export default sessionReducer;