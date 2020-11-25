import React, { useState, useEffect } from 'react';
import * as client from '../../Blockchain/client';
import * as clientapi from '../../Blockchain/blockchain';
import { Button } from 'reactstrap';
import {getMyPeers, getPeers} from '../store/Actions/actionCreator'
import { connect } from "react-redux";

import { ListGroup, ListGroupItem } from 'reactstrap';
import { globals , generals} from '../helpers/globals';


const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;


const mapStateToProps = (state) => {
    return { 
        peers : state.sessionReducer.peers,
        mypeer : state.sessionReducer.mypeer
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      getPeers : () => dispatch(getPeers()),
      getP2PMyInfo : () => dispatch(getMyPeers())
    };
};

let Resend = true;


const MainBlockchain =({ peers, mypeer, getPeers, getP2PMyInfo, gotoRoute }) => {

    const [nump2p, setNump2p ] = useState(-1);
    const [lhost, setLhost ] = useState('');
    const [lport, setLport ] = useState(-1);
    
    const createListGroupItem = (peer) => {
        return (
            <ListGroupItem tag="a" href="#" className="p-2 mt-1 w-50 mr-auto center" onClick={() => 
                        {       
                            generals.selectedProfile = peer
                            gotoRoute('/profile');
                        }
                    }>
                🧍 <b>{peer['userName']}</b> FROM IP ADDRESS <i>{peer['rhost']} : {peer['rport']}</i>
            </ListGroupItem>
        )
    }

    const createMyListGroupItem = (peer) => {
        console.log(peer);
        return (
            <ListGroupItem tag="a" href="#" className="p-2 mt-1 w-50 mr-auto center active">
                😃 <b>ME ({peer['userName']})</b> With IP ADDRESS <i>{peer['lhost']} and port {peer['lport']}</i>
            </ListGroupItem>
        )
    }

    // getP2PMyInfo();

    useEffect(() => {
        // console.log('called')
        try{
            setNump2p(peers.length + 1)
        }catch{
            setNump2p(-1)
        }
        try
        {
            setLhost(mypeer.lhost)
            setLport(mypeer.lport)
        }catch{
            setLhost('')
            setLport(-1)
        }
        // setTimeout(()  => pushTransaction(), 300);
    }, [peers, mypeer])

    const pushTransaction = () => 
    {
        getPeers();
        getP2PMyInfo();
        // OK
    }

    return (
        <>
            <h1>
                BLOCKCHAIN {globals.apiPort} With P2P port {lport}
            </h1>
            <h2>LIST OF ALIVE PEERS {nump2p}</h2>
            <Button onClick={pushTransaction}>Refresh peers.</Button>
            <ListGroup>
                    {
                        mypeer ? 
                            createMyListGroupItem(mypeer) : 
                            <ListGroupItem>
                                Error when getting own P2P information.
                            </ListGroupItem>
                    }
                    { 
                    // todo also verify lhost
                        peers ? 
                            peers.map( peer => 
                                    createListGroupItem(peer)
                                )
                            :
                        (
                            <ListGroupItem>
                                No peer or network error.
                            </ListGroupItem>
                        )
                    }
            </ListGroup> 

        </>)
};

export default connect(mapStateToProps, mapDispatchToProps)(MainBlockchain);