/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

import React, { useState } from 'react';
import { globals } from './helpers/globals';
import { loginInfo, setLogin } from './store/Actions/actionCreator';
import {Column, Table, Cell } from '@blueprintjs/table';
import { Checkbox, Icon, Intent } from "@blueprintjs/core";
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

import './styles/account.css';

import {connect} from 'react-redux'
import { Spinner } from 'reactstrap';

const mapStateToProps = (state) => {
    return {
      session: state.sessionReducer.user,
    };
};
  
const mapDispatchToProps = (dispatch) => ({
    meSetLogin: (user) =>
      dispatch(setLogin(user.userID, user.name, user.password)),
    getLoginInfo: () =>
      dispatch(loginInfo()),
});

const Account = ({session, meSetLogin, getLoginInfo}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [wigglingbtn, setWigglingbtn] = useState(true);


    setTimeout(() => setWigglingbtn(false), 2000);

    getLoginInfo();

    const cellRenderer = (rowIndex: number) => {
        return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
    };
    
    const handleOpen = () => setIsOpen(true);

    const handleClose = () => setIsOpen(false);

    return (
        <div className='accountCover w-100 h-100 p-5'> 
            <h1>
                <Icon icon="bank-account" iconSize={30} className='p-1' />
                Compte d'utilisateur
            </h1>
            <p>
                Priviledges du compte : <strong>administrateur</strong>.
                <br />
                Nom du propriétaire compte : {session.user.name}
            </p>
            
            {
                <Label>
                    Ma fonction a bord : <em>{session.user.fonction}</em>
                    <br />
                    Ce que je peux faire :
                </Label>
            }

            {
                session.user.personID > 0 
                ?
                (
                    <>
                        <Checkbox checked={session.user.lirePersonnel} label="Je peux lire les donnees du personnel." />
                        <Checkbox checked={session.user.lirePermissions} label="Je peux lire les fiches de service." />
                        <Checkbox checked={session.user.ecrirePersonnel} label="Je peux modifier les donnees du personnel." />
                        <Checkbox checked={session.user.ecrirePermissions} label="Je peux modifier les fiches de service." />
                    </>
                )
                :
                (
                    <>
                        <Label>Demande de donnees.</Label>
                        <Spinner />
                    </>
                )
            }
            
           
            <div className="bp3-callout bp3-intent-warning my-2 bp3-icon-info-sign">
                <h4 className="bp3-heading">Configuration</h4>
                Aucun paramétre n'est configurable sur votre compte pour le moment.
                <br />
                <Button 
                    className={ ' bp3-outlined bp3-large ' + ( wigglingbtn ? "docs-wiggle" : "" )}
                    
                    type='button'  
                    icon='help'
                    intent='none'
                    onClick={handleOpen}>
                       <strong> C'est quoi un compte administrateur ?</strong>
                </Button>
            </div>
            <Drawer
                    // className={this.props.data.themeName}
                    icon="info-sign"
                    onClose={handleClose}
                    title="Compte administrateur"
                    // {...this.state}
                                
                    isOpen = {isOpen}
                    position = { Position.RIGHT}
                >
                    <div className={Classes.DRAWER_BODY}>
                        <div className={Classes.DIALOG_BODY}>
                            <p>
                                <strong>
                                    Le compte administrateur se permet de visualiser les données concernant la
                                    situation du personnel, vivres, etc..
                                    Ce compte a aussi le droit de modifier ces données en toute liberté.
                                </strong>
                            </p>
                            <p>
                                Si vous avez un compte administrateur, vous pouvez autoriser d'autres utilisateurs
                                a etre administrateurs eux-memes.
                            </p>    
                            <p>
                                Vous pouvez aussi, en tant qu'administrateur, créer des comptes "standart", consulter
                                leurs visites, ou les supprimer entierement.
                            </p>
                            <p>
                                NB : L'implementation de la gestion de compte n'est pas finie.
                            </p>
                        </div>
                    </div>
                    <div className={Classes.DRAWER_FOOTER}>Informations et aide. Appuyer sur ESC pour reduire.</div>
                </Drawer>
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);