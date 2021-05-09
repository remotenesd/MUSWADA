import React, { useState } from 'react';
import { setLogin, setRoute } from './store/Actions/actionCreator';
import {Column, Table, Cell } from '@blueprintjs/table';
import { Icon } from "@blueprintjs/core";
import {
    Slider
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

const Options = ({session, meSetLogin, setRoute}) => {

    const [fontsz, setFontsz] = useState(1);

    return (
        <div className='permCover w-100 h-100 p-5'> 
            <h1>
                <Icon icon="settings" iconSize={30} className='p-1 mr-1' />
                Options
            </h1>
                <div className="bp3-non-ideal-state">
                    <div className="bp3-non-ideal-state-visual">
                        <span className="bp3-icon bp3-icon-warning-sign"></span>
                    </div>
                    <h4 className="bp3-heading">Erreur de serveur</h4>
                    <div>Désolé. Une erreur a été détectée.</div>
                    <Slider min={1} max={5} stepSize={1} value={fontsz} onChange={e => setFontsz(e)} />
                    <button className="bp3-button bp3-intent-primary" onClick={() => setRoute('/')}>Retour</button>
            </div>
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Options);