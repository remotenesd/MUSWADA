import React, { useState, useEffect } from 'react';
import * as client from '../../Blockchain/client';
import * as clientapi from '../../Blockchain/blockchain';
import { Button } from 'reactstrap';


const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;


const MainBlockchain = (props, state) => {

    const [version, setVersion ] = useState('');
    ipcRenderer.on('startServerResponse', (event, arg) => {
        setVersion(arg);
    });
    useEffect(() => {
        // console.log('called')
    }, [version])
    ipcRenderer.send('startServer', 'ping')
    var data = client.getData()

    const pushTransaction = () => 
    {
        ipcRenderer.send('pushTransaction', {
            sender : 10229,
            data : 'THIS IS SOME HASH DATA REFERRING TO ANY POSSIBLE COMBINATION OF ENTROPY.',
            signature : 'RND SIG',
        });
    }

    return (<>
        <h1>
            BLOCKCHAIN
        </h1>
        <h2>LIST OF LATEST BLOCKS {version}</h2>
        <Button onClick={pushTransaction}>Create transaction</Button>
    </>)
};

export default MainBlockchain;