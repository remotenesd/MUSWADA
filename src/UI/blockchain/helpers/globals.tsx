import Axios, { AxiosResponse } from 'axios';
import { basepermission } from '../register/core';
import { store } from '../store/store';
import { getFirstUsage, getLogin } from '../store/Actions/actionCreator';
import * as theming from '../theming/theming';


console.log("[GLOBALS] IN GLOBALS FILE..")
// local info

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;
let myPort = 5001;


var globalsConstructor = () => { 
    return {
        apiPort : myPort,
        baseURL : "http://localhost:" + myPort,
        appURL : "app",
        userURL : "user",
        todoURL : "todos",
        miscURL : "misc",
        persURL : "pers",
        deplacerURL : "deplacer",
        permissionURL : "permission",
        version : '1.0',

        theme : 'dark',
        
        // blockchain API
        bAPI : 'https://ephemeral.api.factom.com/v1',
        // firstDataSent : false,
        appData : {
            firstUsage : false,
            batiment : '...',
            commandant : '',
            batimentClass : '',
        },
    }
};

let generals = {
    // selected profile
    selectedProfile : null || Object,
    selectedPermission : new basepermission(),
}

var globals = globalsConstructor();
let globalsChangedEvents = [() => {}];

// mobile info

// const globals = {
//     baseURL : "http://192.168.43.4:3033",
//     userURL : "user",
// }


let updateMaker = () => new Promise((resolve, reject) => {
    ipcRenderer.send('reqPortNumber');

    let promisePort : Promise<AxiosResponse<any>>;
    // gotAPIVersion ::: meant 😢 gotPORTNumber
    ipcRenderer.on('gotAPIVersion', (event, arg) => {
        myPort = Number(arg);
        
        globals = globalsConstructor();
        
        promisePort = Axios.get(globals.baseURL + '/' + globals.miscURL + '/getVersion')
        promisePort.then(  (res) => {
            if (res.status === 200)
            {
                // console.log('yes , status ' + res.status)
                // try to fetch version
                globals.version = res.data.version
                store.dispatch(getFirstUsage())
                store.dispatch(getLogin())
                let fetchInitialData = () => {
                    let state = store.getState();
                    if (!state.sessionReducer.loadingAPIFirstData && !state.sessionReducer.loadingAPILogIn)
                    {
                        globalsChangedEvents.map(event => event());
                        console.log(state.sessionReducer)
                        // tell the app to load
                        resolve('yooo')
                    }
                }
                let unsubscribe = store.subscribe(fetchInitialData) // #todo implement
            }
            else{
                reject('error')
            } 
        },
            // if rejection
        (res) => {
            reject('error')
        }).catch(err => reject(err));
        
        // globalsChangedEvents.map(event => event());
    }); 
})

let getAppSpecific = () => new Promise((resolve, reject) => {
    let promiseApp : Promise<AxiosResponse<any>> = Axios.get(globals.baseURL + '/' + globals.appURL + '/getdata');
    promiseApp.then( (res) => {
        if (res.status === 200)
        {
            globals.appData = res.data.app
            if (String(globals.appData.firstUsage).startsWith('T'))
            {
                globals.appData.firstUsage = true
                store.dispatch({type: 'SET_IS_FIRST_TIME'});
            }
            else{
                globals.appData.firstUsage = false
            }
            globalsChangedEvents.map(event => event());
        }
    })
})

let portDidUpdate = updateMaker();
let lostConnection = new Promise((resolve, reject) => {
    // always checking for connection
    ipcRenderer.send('reqPortNumber');
        // gotAPIVersion ::: meant 😢 gotPORTNumber
    ipcRenderer.on('gotAPIVersion', (event, arg) => {
                // wait for api version
                // if so, there is a connection !
                resolve("positive");
        } 
    );
    setTimeout(() => {
        
        // if after 3s, nothing, then there is no connection.
        reject('timeout.');
    }, 4000);
})


function applyTheme()
{
    if (globals.theme === 'light')
    {
        theming.applyTheme(theming.oliveTheme);
        globals.theme = 'dark'
        return;
    }
    if (globals.theme === 'dark')
    {   
        theming.applyTheme(theming.darkTheme)
        globals.theme = 'light'
        return;
    }
}

export { globals , globalsChangedEvents, portDidUpdate, lostConnection, generals, applyTheme};