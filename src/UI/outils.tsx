import React, { useEffect, useState } from 'react';
import { globals } from './helpers/globals';
import { register, setLogin, setRoute, usernameExist } from './store/Actions/actionCreator';
import './styles/personnel.css';
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

const Outils = (props, state) => {

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
                <h1 className="flexitem display-1">
                    Aide d'utilisation 
                </h1>
                <hr />
                
                <Jumbotron className='text-dark'>
                    <h2 className='display-5'>
                        Initiation d'un se-déplacer.
                    </h2>
                    <h4>
                        Impression automatique d'un se deplacer en quelques clics.
                    </h4>
                    <button className='btn btn-link'>Commencer.</button>
                </Jumbotron>

                <Jumbotron className='text-dark'>
                    <h2 className='display-5'>
                        Initiation d'une permission
                    </h2>
                    <h4>
                        Autoriser une permission tout en imprimant le billet.
                    </h4>
                    <button className='btn btn-link'>Commencer.</button>
                </Jumbotron>

                <Jumbotron className='text-dark'>
                    <h2 className='display-5'>
                        Imprimer une fiche individuelle
                    </h2>
                    <h4>
                        Impression automatique de la fiche individuelle.
                    </h4>
                    <button className='btn btn-link'>Commencer.</button>
                </Jumbotron>

                <Jumbotron className='text-dark'>
                    <h2 className='display-5'>
                        Suggérer un outil
                    </h2>
                    <h4>
                        Suggérer l'addition d'un outil via un mail.
                    </h4>
                    <button className='btn btn-link'>Sélectionner.</button>
                </Jumbotron>
            </div>
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Outils);