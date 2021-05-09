import React, { useEffect, useState } from 'react';
import { globals } from '../helpers/globals';
import { register, setLogin, setRoute, usernameExist } from '../store/Actions/actionCreator';
import '../styles/personnel.css';
import avatar from './images/avatar-svgrepo-com.svg';

import {connect} from 'react-redux'
import { Button, Col, Form, FormGroup, Input, Jumbotron, Label, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

const mapStateToProps = (state ) => {
    return {
        usernameExist : state.sessionReducer.usernameExist,
        registeredUser : state.sessionReducer.registeringUser,
        registerSuccess : state.sessionReducer.registerSuccess,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        doesUsernameExist : (username) => dispatch(usernameExist(username)),
        register : (user) => dispatch(register(user)),
        setRoute : (route) => 
                            dispatch(setRoute(route)),
    }
}

const Bordees = (props, state) => {

    let [PORT, setPORT ] = useState(globals.apiPort);
    let [version, setVersion ] = useState(globals.version);


    const pushTransaction = () => 
    {
        // ipcRenderer.send('pushTransaction', {
        //     sender : 10229,
        //     data : 'THIS IS SOME HASH DATA REFERRING TO ANY POSSIBLE COMBINATION OF ENTROPY.',
        //     signature : 'RND SIG',
        // });
    }

    return (
        <div className={"d-flex w-100 h-100 align-items-center justify-content-center outilsCover"}>
            <div className="flexboxupdown my-5  py-5" style={{overflowX: 'hidden', overflowY: 'scroll', marginTop: '50px', marginBottom: '50px', maxHeight: '80vh', width: '90vh', paddingRight: '20px'}}>
                <h1 className="flexitem">
                    Outils et paramétres
                </h1>
                <hr />
                
               
            </div>
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Bordees);