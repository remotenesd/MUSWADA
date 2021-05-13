import {user, IState} from '../core/core';
import * as ActionTypes from '../Actions/actionTypes';
import * as Actions from '../Actions/actionCreator';
import session from '../../storage/localStorage';
import { globals, globalsChangedEvents } from '../../helpers/globals';
import { reMakeStore, store } from '../store';
import { AxiosResponse } from 'axios';

let emptyUser : user = new user('', '', '');


const makeNewInitState = () => {
    return {
        user : new session(false),
        registeringUser : emptyUser,
        usernameExist : true,
        registerSuccess : false,
        isLoggedIn : false,
        loadingAPILogIn : true, // only use for startup
        loadingAPIFirstData : true,
        routing : '',
        myblkchn : null,
        theme : 'dark',
        peers : [],
        mypeer : {},
        firstUsage : false,
        batiment : '',
        commandant : '',
        batimentClass : '',

        priseArmes : {},
        priseArmesEtablie : false,
        priseArmesEcrite : false,
    }
}   

let initState : IState = makeNewInitState() as IState

// let curPortDontUse =  globals.apiPort;

// globalsChangedEvents.push( 
//     () => {
//         if (globals.apiPort !== curPortDontUse)
//         {
//             // console.log('[..] CALLED STORE REMAKE.')
//             // setTimeout(() => {

//             //     curPortDontUse = globals.apiPort; // DONT USE EXCEPT HERE
//             //     initState = makeNewInitState() as IState;
                
//             //     // REMAKE STORE
//             //     reMakeStore();
//             // }, 300)
            
//         }
//     }
// )

function sessionReducer(state = makeNewInitState(), action) {
    // console.log('--------------called with state ' + state);

    if (action.type === 'FAKE_DISPATCH')
    {
        return Object.assign({}, state,
            {
                user : state.user
            }
        )
    }
    console.log(action.type);

    // app API
    if (action.type === ActionTypes.APP_GET_FIRST_USAGE)
    {
        if (action.success && String(action.data.firsttime).startsWith('T'))
        {
            globals.appData.batiment = action.data.batiment;
            globals.appData.commandant = action.data.commandant;
            globals.appData.batimentClass = action.data.batimentClass;
            return Object.assign({}, state,
                { 
                    // user : state.user,
                    routing : '/RegisterInitial',
                    batiment : action.data.batiment,
                    commandant : action.data.commandant,
                    batimentClass : action.data.batimentClass,
                    loadingAPIFirstData : false,
                }
            )
        }
        else if (action.success)
        {
            globals.appData.batiment = action.data.batiment;
            globals.appData.commandant = action.data.commandant;
            globals.appData.batimentClass = action.data.batimentClass;
            return Object.assign({}, state,
                { 
                    batiment : action.data.batiment,
                    commandant : action.data.commandant,
                    batimentClass : action.data.batimentClass,
                    loadingAPIFirstData : false,
                }
            )
        }
    }

    if (action.type === 'SET_IS_FIRST_TIME')
    {
        return Object.assign({}, state,
            { 
                firstUsage : true,
            }
        )
    }

    if (action.type === ActionTypes.APP_SET_FIRST_DATA)
    {
        if (action.success)
        {
            globals.appData.firstUsage = false;
            return Object.assign({}, state,
                { 
                    // user : state.user,
                    routing : '/register',
                    firstUsage : false,
                }
            )
        }
    }

    // user API
    if (action.type === ActionTypes.GET_LOGIN)
    {
        if (action.success)
        {
            return Object.assign({}, state, {
                user : action.data,
                isLoggedIn : true,
                loadingAPILogIn : false
            });
        }
        else{
            return {
                ...state, isLoggedIn: false, loadingAPILogIn : false
            }
        }    
    }

    if (action.type === ActionTypes.LOGIN_INFO)
    {
        if (action.success)
        {
            console.log(action.data)
            state.user.user.ecrirePermissions = action.data.ecrirePermissions;
            state.user.user.lirePermissions = action.data.lirePermissions;
            state.user.user.lirePersonnel = action.data.lirePersonnel;
            state.user.user.ecrirePersonnel = action.data.ecrirePersonnel;
            state.user.user.fonction = action.data.fonction;
            state.user.user.personID = 1000;
            
            return Object.assign({}, state, {
                user : state.user,
            });
        }
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
                isLoggedIn : ses.isLoggedIn,
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
                { user : noLogSession, isLoggedIn : false,}
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
            return Object.assign({}, state,
                { 
                    // user : state.user,
                    routing : action.payload.route,
                }
            )
        }
    }

    if (action.type === ActionTypes.PERSONNEL_PRINT_PROFILE_DIGITAL)
    {
        if (action.success)
        {
            return Object.assign({}, state,
                { 
                    // user : state.user,
                    routing : '/personnel',
                }
            )
        }
    }
    if (action.type === ActionTypes.PERSONNEL_SEND_DEPLACER)
    {
        if (action.success)
        {
            return Object.assign({}, state,
                { 
                    // user : state.user,
                    routing : '/Listdeplacer',
                }
            )
        }
    }

    if (action.type === ActionTypes.PERSONNEL_SEND_DEPLACER)
    {
        if (action.success)
        {
            return Object.assign({}, state,
                { 
                    // user : state.user,
                    routing : '/Listpermission',
                }
            )
        }
    }

    if (action.type === ActionTypes.PERSONNEL_GET_PRISE_ARMES)
    {
       if (action.success)
       {
            return Object.assign({}, state,
                { 
                    // user : state.user,
                    priseArmes : action.data.priseArmes,
                    priseArmesEtablie : true,
                }
            )
       }
       else{
            if (!state.priseArmesEtablie)
            {
                return Object.assign({}, state,
                    { 
                        // user : state.user,
                        priseArmes : {},
                        priseArmesEtablie : false,
                    }
                )
            }
       }
    }
    
    if (action.type === ActionTypes.PERSONNEL_SET_PRISE_ARMES)
    {
        return Object.assign({}, state,
            { 
                // user : state.user,
                priseArmesEcrite : action.success,
            }
        )
    }

    if (action.type === ActionTypes.PERSONNEL_PROFILE_SM1 && action.data === "INVALID REQUEST ARGS")
    {
        return Object.assign({}, state,
            { 
                // user : state.user,
                routing : '/serverError',
            }
        )
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