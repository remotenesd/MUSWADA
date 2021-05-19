/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

import {connect} from 'react-redux';

import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { Form, FormGroup, Label,
    Input, Col, Button,
} from 'reactstrap'; 

import './styles/initialSetup.css';
import {initialiseSetup, setRoute} from './store/Actions/actionCreator';

import React, { useState } from 'react';
import { globalsChangedEvents } from './helpers/globals';

const mapStateToProps = (state) => {
    return {
      session: state.sessionReducer.user,
    };
};
  
const mapDispatchToProps = (dispatch) => ({
      setRoute : (route) => 
                    dispatch(setRoute(route)),
      initData : (initData) => dispatch(initialiseSetup(initData))
});

const RegisterInitial = ({session, setRoute, initData}) => {

    const [appStage, setAppStage] = useState(0)

    const [batiment, setBatiment] = useState('')
    const [commandant, setCommandant] = useState('')
    const [classBatiment, setClassBatiment] = useState('')

    const register = () => {
        const initConf = {
            batiment : batiment,
            classBatiment : classBatiment,
            commandant : commandant,
        }
        console.log(initData)
        initData(initConf);
    }

    if (appStage == 0)
    {  
        return (
            <div className="initialSetup initialCover">
                <h1>
                    <Icon icon={IconNames.EDIT} iconSize={30} className='p-1 mr-3' />
                    Premiere configuration du logiciel
                </h1>
                <h4>
                    Configuration pour l'administration du bateau.
                </h4>
                <p>
                    <br /><br />
                    <em>
                        Introduction : A lire
                    </em>
                    <br /><br />
                    1. Il s'agit d'un gestionnaire de personnel, couvrant tout les aspects de la vie a bord. 
                    Initialement, la tache d'introduire et mettre a jour la base de donnee peut etre labourieuse.
                    <br />Mais ceci fini, la gestion devient facile: vous pouvez checher en toute facilite toute information
                    concernant le status du personnel : renseignements de base, permissionnaires (avec statistiques...), etc.
                    <br />Vous pouvez aussi automatiser des taches tel que l'impression automatique de la fiche de renseignements
                    individuelle.
                    <br /><br />

                    2. Chaque personne de bord a un compte personnel. 
                    Le commandant est le premier a avoir un compte.
                    Un officier seul pourra autoriser la creaction d'un compte pour le
                    personnel non officier.<br />
                    Il decide aussi le privilege de ce compte : qu'est ce qu'il peut lire, et ce qu'il peut modifier.
                </p>

                <a style={{float: 'right'}} onClick={() => {setAppStage(1)}}>Continuer ⏩</a>
            </div>
        )
    }
    else if (appStage == 1)
    {
        return (
            <div className="initialSetup initialCover">
                <h1>
                    <Icon icon={IconNames.EDIT} iconSize={30} className='p-1 mr-3' />
                    Premiere configuration du logiciel
                </h1>
                <h4>
                    Configuration pour l'administration du bateau.
                </h4>
                <Form>
                    <FormGroup row>
                        <Label size="lg" xs={12} sm={12} for="classBatiment">La classe du batiment :</Label>
                        <Col>
                            <Input xs={12} sm={12} bsSize="lg"
                                    type="select"
                                    name="classBatiment"
                                    id="classBatiment"
                                    value={classBatiment}
                                    onChange={(e:any) => setClassBatiment(e.target.value)}
                            >
                                <option>Class FREMM</option>
                                <option>Class SIGMA</option>
                                <option>Class DESCUBIERTA</option>
                                <option>Class OPV 70</option>
                                <option>Class OPV 64</option>
                                <option>Class LAZAGA</option>
                                <option>Class OSPREY55</option>
                                <option>Class PR72</option>
                                <option>Class BATREAL</option>
                                <option>OTHER</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label size="lg" xs={12} sm={12} for="batiment">Nom du batiment </Label>
                        <Col>
                            <Input xs={12} sm={12} bsSize="lg"
                                    type="text"
                                    name="batiment"
                                    id="batiment"
                                    value={batiment}
                                    onChange={(e:any) => setBatiment(e.target.value)}
                                    />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label size="lg" xs={12} sm={12} for="commandant">Nom du commandant</Label>
                        <Col>
                            <Input xs={12} sm={12} bsSize="lg"
                                    type="text"
                                    name="commandant"
                                    id="commandant"
                                    value={commandant}
                                    onChange={(e:any) => setCommandant(e.target.value)}
                                    />
                        </Col>
                    </FormGroup>
                </Form>
                <p>
                    Pour chaque utilisateur, par sa fonction et son grade, il devra creer son compte personnel. Le commandant doit etre le premier a creer
                    compte. Vous serez rediriges a la page de creation de compte pour creer le compte du commandant.
                </p>
                <a style={{float: 'right'}} onClick={
                        () => {
                            setAppStage(2); 
                            register();
                        }
                    }>
                        🛳️ Finir et creer le compte du CDT
                </a>
            </div>
        )
    }
    else
    {
        return (
            <div className="initialSetup initialCover">
            <h1>
                <Icon icon={IconNames.APPLICATION} iconSize={30} className='p-1 mr-3' />
                Veillez attendre
            </h1>
            <h4>
                Preparation des donnees...
            </h4>
        </div>
            
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterInitial);