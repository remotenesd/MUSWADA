import React, { useEffect, useState } from 'react';
import {globals, globalsChangedEvents, generals} from './helpers/globals';
import { Container, Row, Col, Media, Form, FormGroup, Label, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import {Button, Spinner, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Classes} from '@blueprintjs/core';
import { questionIcon } from './icons';
import papersvg from './images/paper.svg';
import {connect} from 'react-redux'

import './styles/personnel.css';
import avatar from './images/avatar-svgrepo-com.svg';
import { setRoute } from './store/Actions/actionCreator';
import { PERSONNEL_PROFILE_SM1, PERSONEL_DEPLACER_LIST_DU } from './store/Actions/actionTypes';

const { ipcRenderer } = window.require("electron");

const mapStateToProps = (state) => {    
    return {
      session: state.sessionReducer.user,
      listPers : state.rgReducer.basicList,
      profile : state.rgReducer.profile,
      lastPrintedPdf : state.rgReducer.lastPrintedPdf,
      lastPrintedID : state.rgReducer.lastPrintedID,
      listDu : state.rgReducer.listDu,
    };
};
  
const mapDispatchToProps = (dispatch) => ({
    setRoute : (route) => 
      dispatch(setRoute(route)),
    profilesm1 : (profile) => dispatch({type : PERSONNEL_PROFILE_SM1, data : {profile : profile}}),
    listdu : (date) => dispatch({type : PERSONEL_DEPLACER_LIST_DU, payload : {date_ : date}}),
});

const Listedeplacer = ({route, profile, setRoute, listdu, profilesm1, printProfile, lastPrintedPdf, lastPrintedID, listDu}) => {

    const today = new Date();
    const myNumFormatter = (num, nbr) => ("0" + num).slice(-nbr);
    const date_ =  myNumFormatter(today.getFullYear(), 4) + '/' +  myNumFormatter(today.getMonth() + 1, 2)  + '/' +  myNumFormatter(today.getDate(), 2) ;
    let [seldate, setSeldate] = useState('');

 
    useEffect(() => {
        console.log('// \\setting date !')
        // setSeldate(date_);
        console.log(seldate);
        const newDate_ = new Date(seldate);
        let newdate_ =  myNumFormatter(newDate_.getFullYear(), 4) + '/' +  myNumFormatter(newDate_.getMonth() + 1, 2)  + '/' +  myNumFormatter(newDate_.getDate(), 2) ;
        listdu(newdate_);  
    }, [seldate]);

    console.log(listDu);

    return (<>
        
        <div className="d-flex w-100 h-100 profileCover" style={{color: "#012121"}}>
            <div id="aside">
                <div className="asideTitle">
                    Liste des se-déplacer
                </div>
                <div className="asideActions">
                    <Button minimal={true} style={{color: 'black', fontWeight: 500,fontSize: '1.14em'}} large={true} className='asideBtn'>
                        🖨️ Imprimer les se-déplacer !
                    </Button>
                   
                    
                    <hr style={{backgroundColor : 'whitesmoke', color: 'whitesmoke'}} />
                    
                    <Button minimal={true} style={{color: 'black', fontWeight: 500,fontSize: '1.14em'}}  large={true}  
                        onClick={() => setRoute('/personnel')}
                        className='asideBtn'>
                            ↙️ Retour au profil.
                    </Button>
                </div>
            </div>
            <div className="maindPers" style={{paddingTop: '20px'}}>
                {/* <h1>
                    Fiche individuelle de {profile.nom}
                </h1> */}
                
                <div className='float-left bg-secondary m-3 p-1 rounded'>
                    <h3 className=''>🚶‍ Accorder un se-déplacer</h3>
                </div>
                <hr />
                <div className="container w-100 h-75 m-5" style={{overflowY: 'auto', overflowX: 'hidden'}}>
                    <div className='row w-25' style={{minHeight: '10rem', position: 'absolute', right: '20px', top: '50px' }}>
                        <img className='col' src={papersvg} width='max-content' height='auto' alt='' />   
                    </div>
                    <hr />
                    <h3>
                        Liste des se-déplacers du {date_}
                    </h3>
                    <Form>
                        <FormGroup row>
                            <Label size='lg' xs={12} sm={12} for="whom">
                                Se-déplacer accordé a {profile.grade} {profile.nom} {profile.prenom},
                                pour béneficier d'un déplacement :
                            </Label>
                        </FormGroup>
                        <FormGroup row className='mr-3'>
                            <Label size='lg' xs={12} sm={3} for='date'>
                                Le : 
                            </Label>
                            <Col>
                                <Input 
                                    type="date" 
                                    sm={4}
                                    bsSize="lg"
                                    placeholder={'12/12/1970'}
                                    value={seldate} 
                                    // defaultValue={date_}
                                    onChange={(e) => setSeldate(e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                    </Form>
                    <ListGroup>
                        {
                            listDu.map(ls => 
                                (
                                    <ListGroupItem>
                                        <ListGroupItemHeading>{ls ? ls.appelation : '' }</ListGroupItemHeading>
                                        <ListGroupItemText>
                                        Se déplacer accordé pour motif : {ls ? ls.motif : <Spinner />}
                                        </ListGroupItemText>
                                    </ListGroupItem>
                                )    
                            )
                        }
                        
                       
                    </ListGroup>
                    <Button onClick={()=>setRoute('/personnel')} intent='warning' style={{position: 'absolute', right: '30px', bottom: '30px', width: '100px'}} minimal={true}> ⬅️ Go back</Button>
                </div>
            </div> 
        </div>
    </>)
};

export default connect(mapStateToProps, mapDispatchToProps)(Listedeplacer);