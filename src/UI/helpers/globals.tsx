import {EventEmitter} from 'events'
import Axios, { AxiosResponse } from 'axios';


let ev = new EventEmitter();
// local info

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;
let myPort = 5001;


let globalsConstructor = () => { 
    return {
        apiPort : myPort,
        baseURL : "http://localhost:" + myPort,
        userURL : "user",
        todoURL : "todos",
        miscURL : "misc",
        p2pURL : "p2p",
        version : '1.0',
        
        // blockchain API
        bAPI : 'https://ephemeral.api.factom.com/v1',
    }
};

let generals = {
    // selected profile
    selectedProfile : null || Object,
}

let globals = globalsConstructor();
let globalsChangedEvents = [() => {}];



ev.on('connection', () => {
    
})

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
                globalsChangedEvents.map(event => event());
                // tell the app to load
                resolve('yooo')
            }
            else{
                reject('error')
            }
        },
            // if rejection
        (res) => {
            reject('error')
        }).catch(err => reject(err));
        
        globalsChangedEvents.map(event => event());
    }); 
})
let portDidUpdate = updateMaker();
let lostConnection = new Promise((resolve, reject) => {
    // always checking for connection
    setInterval(() => {
        portDidUpdate = updateMaker();
        let connectionEstablished = false;
        portDidUpdate.then(
            () => {
                connectionEstablished = true;
                // console.log('connection established')
            }, () => {connectionEstablished = false}
        ).catch(() => resolve('lost !'))
        // if after 3s, nothing, then there is no connection.
        // console.log('checking connection')
        setTimeout(() => {
            if (! connectionEstablished)
            {
                // console.log('[] connection not established')
                resolve('timeout.')
            }
        }, 3000);
    }, 5000)
})


export { globals , globalsChangedEvents, portDidUpdate, lostConnection, generals};