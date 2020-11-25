import {user, IState} from '../core/core';
import * as ActionTypes from '../Actions/actionTypes';
import * as Actions from '../Actions/actionCreator';
import session from '../../storage/localStorage';
import { globals, globalsChangedEvents } from '../../helpers/globals';
import { reMakeStore } from '../store';

let emptyUser : user = new user('', '', '');


const makeNewInitState = () => {
    return {
        user : new session(),
        registeringUser : emptyUser,
        usernameExist : true,
        registerSuccess : false,
        routing : '',
        myblkchn : null,
        theme : 'dark',
        peers : [],
        mypeer : {},
    }
}   

let initState : IState = makeNewInitState() as IState

let curPortDontUse =  globals.apiPort;

globalsChangedEvents.push( 
    () => {
        if (globals.apiPort !== curPortDontUse && globals.apiPort !== 5001)
        {
            console.log('[..] CALLED STORE REMAKE.')
            setTimeout(() => {

                curPortDontUse = globals.apiPort; // DONT USE EXCEPT HERE
                initState = makeNewInitState() as IState;
                
                // REMAKE STORE
                reMakeStore();
            }, 300)
            
        }
    }
)

function sessionReducer(state = makeNewInitState(), action) {
    // console.log('--------------called with state ' + state);

    if (action.type === 'FAKE_DISPATCH')
    {
        // return Object.assign({}, state,
        //     {
        //         user : state.user
        //     }
        // )
    }
    if (action.type === ActionTypes.SET_LOGIN)
    {
        console.log('ATTEMPTING A LOG IN [//\\]')
        if (action.data.user !== null)
        {
            // successful login from middleware,
            // engage in session creation
            var ses = new session(false);
            ses.login(action.data.user.userID, action.data.user.name, action.data.user.password);
            return Object.assign({}, state, {
                user : ses,
            });
        }
        else {
            // no login ?? let's tell the user !
            var noLogSession = (new session(false));
            noLogSession.genNoLoginData();
            return Object.assign({}, state,
               { user : noLogSession,}
            )
        }
    }
    if (action.type === ActionTypes.LOGOUT)
    {
        var noLogSession = (new session(false));
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

    if (action.type === ActionTypes.P_GET_PEERS)
    {
        if (action.data.peers != null)
        {
            console.log(action.data.peers)
            return Object.assign({}, state, 
            {
                    peers : action.data.peers
            });
        }
    }

    if (action.type === ActionTypes.P_GET_MY_PEER)
    {
        if (action.data !== null && action.data !== undefined)
        {
            return Object.assign({}, state, 
                {
                    mypeer : {
                        lhost : action.data.lhost,
                        lport : action.data.lport
                    }
                });
        }
    }

    return state;
}

export default sessionReducer;