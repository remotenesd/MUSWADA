import React, { useState, useEffect } from 'react';
import * as client from '../../Blockchain/client';
import * as clientapi from '../../Blockchain/blockchain';
import { Button } from 'reactstrap';
import {getPeers} from '../store/Actions/actionCreator'
import { connect } from "react-redux";


const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;


const mapStateToProps = (state) => {
    return { peers : state.sessionReducer.peers };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      getPeers : () => dispatch(getPeers())
    };
};


const MainBlockchain = ({ peers, getPeers }) => {

    const [nump2p, setNump2p ] = useState(-1);
    
    useEffect(() => {
        // console.log('called')
        try{
            setNump2p(peers.length)
        }catch{
            setNump2p(-1)
        }
    }, [peers])
    ipcRenderer.send('startServer', 'ping')
    var data = client.getData()

    const pushTransaction = () => 
    {
        getPeers();
        // OK
    }

    return (<>
        <h1>
            BLOCKCHAIN
        </h1>
    <h2>LIST OF ALIVE PEERS {nump2p}</h2>
        <Button onClick={pushTransaction}>Create transaction</Button>
        {peers ? peers.map( peer => 
            <h3>{peer['userName']} FROM IP ADDRESS <i>{peer['rhost']} : {peer['rport']}</i></h3>
        ) : <> </>}
    </>)
};

export default connect(mapStateToProps, mapDispatchToProps)(MainBlockchain);