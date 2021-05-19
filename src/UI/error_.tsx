/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

import React, { useState } from 'react';
import { globals } from './helpers/globals';
import { setLogin, setRoute } from './store/Actions/actionCreator';
import {Column, Table, Cell } from '@blueprintjs/table';
import { Icon, Intent } from "@blueprintjs/core";
import {
    Button,
    Classes,
    Code,
    Divider,
    Drawer,
    H5,
    HTMLSelect,
    IOptionProps,
    Label,
    Position,
    Switch,
} from "@blueprintjs/core";

import './styles/permissionnaires.css';

import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
      session: state.sessionReducer.user,
    };
};
  
const mapDispatchToProps = (dispatch) => ({
    meSetLogin: (user) =>
                    dispatch(setLogin(user.userID, user.name, user.password)),
      setRoute : (route) => 
                    dispatch(setRoute(route)),
});

const Error_ = ({session, meSetLogin, setRoute}) => {

    return (
        <div className='permCover w-100 h-100 p-5'> 
            <h1>
                <Icon icon="error" iconSize={30} className='p-1' />
                Erreur
            </h1>
                <div className="bp3-non-ideal-state">
                    <div className="bp3-non-ideal-state-visual">
                        <span className="bp3-icon bp3-icon-warning-sign"></span>
                    </div>
                    <h4 className="bp3-heading">Erreur de serveur</h4>
                    <div>Désolé. Une erreur a été détectée.</div>
                    <button className="bp3-button bp3-intent-primary" onClick={() => setRoute('/')}>Retour</button>
            </div>
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Error_);