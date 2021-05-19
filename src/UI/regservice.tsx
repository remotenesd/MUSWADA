import React, { useEffect, useState } from 'react';
import { globals } from './helpers/globals';
import { setLogin, setRoute } from './store/Actions/actionCreator';
import './styles/personnel.css';
import avatar from './images/avatar-svgrepo-com.svg';

import {connect} from 'react-redux'
import { Col, Form, FormGroup, Input, Label } from 'reactstrap';

import classNames from 'classnames';

import {
    Button, Overlay, Classes, Dialog, Tree, ITreeNode, Spinner, Tooltip, NonIdealState
} from "@blueprintjs/core";

import { Omnibar } from "@blueprintjs/select";
import { baseperson } from './register/core';
import { PERSONNEL_LIST_PERSONNEL, PERSONNEL_PROFILE_SM1, PERSONNEL_CLEAR_PROFILE } from './store/Actions/actionTypes';

const mapStateToProps = (state) => {    
    return {
      session: state.sessionReducer.user,
      listPers : state.rgReducer.basicList,
    };
};
  
const mapDispatchToProps = (dispatch) => ({
    meSetLogin: (user) =>
      dispatch(setLogin(user.userID, user.name, user.password)),
    setRoute : (route) => 
      dispatch(setRoute(route)),
    getPersonnel : () => dispatch({type : PERSONNEL_LIST_PERSONNEL}),
    profilesm1 : (profile) => dispatch({type : PERSONNEL_PROFILE_SM1, data : {profile : profile}}),
    clearprofile : () => dispatch({type : PERSONNEL_CLEAR_PROFILE}),
});

const REGSERVICE = ({session, meSetLogin, listPers, setRoute, getPersonnel, profilesm1, clearprofile}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState(Array<ITreeNode>());

    const [filtername, setFiltername] = useState('');

    const searchContainer = () => {
        return (
            <Form>
                    <FormGroup row>
                        <Label size="lg" sm={2} for="searchQuerry"> 💬 </Label>
                        <Col sm={10}>
                            <p>
                                Pour ajouter une personne a la base de données,
                                merci de renseigner les champs qui seront demandés.
                                Priere de verifier ces informations, elles pourraient etre utilisées
                                pour créer une fiche de renseignement.
                            </p>
                            <a href="#"  className='link mx-2 my-1'>(*) 🧰 Recherche specialisée.</a>
                            <a href="#" className='link mx-2  my-1' onClick={() => setRoute('person')}>(+) 🧍 Ajout profil.</a>
                        </Col>
                    </FormGroup>
            </Form>
        )
    }
    
    const dialog = () => {
        return (
            <Dialog
                    className={'dark'}
                    icon="info-sign"
                    onClose={() => setIsOpen(false)}
                    title="FIND PERSON"
                    isOpen={isOpen}
                >
                    <div className={Classes.DIALOG_BODY}>
                        <p>
                            <strong>
                                Trouver un membre par nom :
                            </strong>
                        </p>
                        <p>
                            Vous pouvez aussi utiliser le dialogue de recherche avancée pour plus de filtres.
                        </p>
                        {searchContainer()}
                    </div>
                    <div className={Classes.DIALOG_FOOTER}>
                        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                            
                        </div>
                    </div>
                </Dialog>
        )
    }
    
    const classes = classNames(
        Classes.OVERLAY_CONTAINER,
        Classes.OVERLAY_CONTENT,
    );

    const handleClick = () => {
        setIsOpen(true);
    };

    const closeClick = () => {
        setIsOpen(false);
    };

    

   
    useEffect( () => {
        let _id = 0;
        const getIncId = () =>
        {
            _id +=1;
            return _id;
        }


        const filteredListPers = listPers.filter((pers : baseperson) => (pers.nom.toLocaleUpperCase().includes(filtername.toLocaleUpperCase()) || (pers.prenom.toLocaleUpperCase().includes(filtername.toLocaleUpperCase())  ) ) );
        
        const listItems = (filteredListPers.map( (pers : baseperson) =>  {
            const nm = pers.grade + " " + pers.nom + " " + pers.prenom;
            return { 
                id : pers.id,
                hasCaret : true,
                icon: "person",
                isExpanded : false,
                label:  ( 
                    <Tooltip content={nm}>
                        
                        <p style={{fontSize: '1.5em' , fontWeight: 'bold'}}>
                            {nm}
                        </p>
                    </Tooltip>
                ),
                
                childNodes : [
                    {
                        id : 0,
                        hasCaret: false,
                        label: (<Button minimal={true} onClick={() => {}}>Afficher la fiche de renseignements.</Button>)
                    }
                ]
            }
        }))

        listItems.forEach(item => items.push(item));

        console.log(items);

        setItems(listItems);
        // return function cleanup()
        // {
        //     items = [];
        // }
    } , [listPers, filtername])



    const handleNodeClick = (nodeData: ITreeNode, _nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
        clearprofile();
        profilesm1(nodeData.id);
        setRoute('/profile')
    };

    const handleNodeExpand = (nodeData: ITreeNode) => {
        items.forEach(item => {
            if (item.id=== nodeData.id)
            {
                item.isExpanded = ! item.isExpanded;
                console.log(item);
            }
        });
        console.log(items);
        setItems(items);
    };

    return (
        <>

        <div className="d-flex w-100 h-100 personnelCover" style={{color: "#012121"}}>
            <div className="maindPers pl-3  align-items-center justify-content-center " style={{paddingTop: '20px'}}>
                <h1>
                    Liste du personnel a bord ({items.length})
                </h1>
                <h4>
                    Saisir requette ou explorer la liste compléte du personnel de batiment.
                </h4>
                <FormGroup row>
                        <Label size="lg" sm={2} for="searchQuerry"> 💬 </Label>
                        <Col sm={10}>
                            <Input  autoFocus={true} bsSize="lg" sm={10} 
                                type="text" name="searchQuerry" id="searchQuerry" 
                                placeholder="Nom" 
                                value={filtername}
                                onChange={(e) => setFiltername(e.target.value)}
                                />
                           </Col>
                </FormGroup>
                <h4>
                    Sinon, pensez a méttre a jour la base de données en cliquant sur "Plus d'options"
                </h4>
                <a 
                    style={{fontSize : '1.4em'}}
                    onClick={() => setRoute('/person')}><u>Ajouter une personne !</u></a>
                <Button text="Plus d'options !"  minimal={true} large={true} rightIcon='add-column-right'  intent='danger' style={{padding: '5px', margin: '3px', float: 'right'}} onClick={handleClick} />
                
                <hr style={{color: 'wheat', backgroundColor: 'wheat'}} />
                <h4>
                    Liste actuelle :
                </h4>
                {
                    (items.length === 0 ) ?(
                        filtername.length === 0 ?
                            <Spinner /> : 
                            <NonIdealState
                                
                                icon={"search"}
                                title="No search results"
                                description={"Aucune personne ne porte le critére demandé. Penser a mettre a jour la base de donnée !"}
                                action={<a onClick={() => setRoute('/person')}>Ajouter.</a>}
                            />
                            )
                            :(
                            <Tree 
                                    contents={items}
                                    className={Classes.ELEVATION_3}
                                    onNodeClick={handleNodeClick}
                                    onNodeExpand={handleNodeExpand}
                             />
                            )
                }
               
            </div>
            {/* <div className="childPers w-100 p-0 ">
                <div className='float-right bg-secondary m-3 p-1 rounded'>
                    <h3 className=''>🕶️ Apercu rapide</h3>
                </div>
                <hr />
                <div className="container w-100 min-vh-100">
                    <div className='row w-100' style={{minHeight: '10rem'}}>
                        <img className='col' src={avatar} width='max-content' height='auto' alt='' />   
                        <h4 className='col m-auto'>Mr Joe Something</h4>
                    </div>
                    <div className="row my-1 w-100 border-bottom border-light" style={{minHeight: '10rem'}}>
                        <h4 className='col'>Grade et nom :</h4>
                        <h5 className='col'>Mr something</h5>
                    </div>
                    <div className="row w-100 align-items-end" style={{minHeight: '10rem'}}>
                        <span className='col'></span>
                        <button type='button' onClick={() => setRoute('/Profile')} className='col btn btn-outline-warning'>Naviguer au profil.</button>
                    </div>
                </div>
            </div> */}

            
        </div>
        <Overlay isOpen={isOpen} onClose={closeClick} transitionName={Classes.OVERLAY_CONTAINER}> 
                {/* {searchContainer()} */}
                {dialog()}
        </Overlay>

        </>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(REGSERVICE);