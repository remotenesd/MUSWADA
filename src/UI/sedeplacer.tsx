import React, { useState } from 'react';
import {globals, globalsChangedEvents, generals} from './helpers/globals';
import { Container, Row, Col, Media, Form, FormGroup, Label, Input } from 'reactstrap';
import {Button, Spinner, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Classes} from '@blueprintjs/core';
import { questionIcon } from './icons';
import {connect} from 'react-redux'


import './styles/personnel.css';
import avatar from './images/avatar-svgrepo-com.svg';
import { setRoute } from './store/Actions/actionCreator';
import RegisterSuccess from './navs/registerSuccess';

const { ipcRenderer } = window.require("electron");

const mapStateToProps = (state) => {    
    return {
      session: state.sessionReducer.user,
      listPers : state.rgReducer.basicList,
      profile : state.rgReducer.profile,
      lastPrintedPdf : state.rgReducer.lastPrintedPdf,
      lastPrintedID : state.rgReducer.lastPrintedID,
    };
};
  
const mapDispatchToProps = (dispatch) => ({
    setRoute : (route) => 
      dispatch(setRoute(route)),
    getPersonnel : () => dispatch({type : 'listPers'}),
    profilesm1 : (profile) => dispatch({type : 'profilesm1', data : {profile : profile}}),
    printProfile : (profile) => dispatch({type : 'printprofile', data : {profile : profile}}),
    regDeplacer : (profile) => dispatch({type : 'senddeplacer', payload : {deplacer : profile}}),
    listDeplacer : () => dispatch({type : 'listDeplacer'}),
});

const Deplacer = ({route, profile, setRoute, printProfile, lastPrintedPdf, lastPrintedID, regDeplacer, listDeplacer}) => {

    const today = new Date();

    const myNumFormatter = (num, nbr) => ("0" + num).slice(-nbr);
    const date_ =  myNumFormatter(today.getDate(), 2) + '/' + myNumFormatter(today.getMonth() + 1, 2) + '/' + myNumFormatter(today.getFullYear(), 4) ;

    let [mydate, setMydate ] = useState('');
    let [myftime, setMyftime ] = useState('');
    let [myetime, setMyetime ] = useState('');
    let [motif, setMotif ] = useState('');

    let selectedProfile = generals.selectedProfile!;

    // console.log(generals.selectedProfile)

    const pushTransaction = () => 
    {
        // ipcRenderer.send('pushTransaction', {
        //     sender : 10229,
        //     data : 'THIS IS SOME HASH DATA REFERRING TO ANY POSSIBLE COMBINATION OF ENTROPY.',
        //     signature : 'RND SIG',
        // });
    }

    const makeIcon = (size : number , icon : JSX.Element) => {
        return (
            <div className=" w-auto my-auto d-inline mx-4 ">
                <svg width= {size + "em"} height= {size + "em"}  viewBox="0 0 16 16" className="bi bi-calendar4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    {icon}
                </svg>
            </div>
        );
    }
    
    if (profile === undefined || profile.nom === undefined || profile.nom === '...' )
    {
        setTimeout(() => {
            return (<>
                        <h1>Erreur lors de la création du fichier.</h1>
                        <Button onClick={()=>setRoute('/personnel')} intent='warning'  minimal={true}> ⬅️ Go back</Button>
                    </>)
        }, 20000)
        console.log(profile);
        return (<> 
                <h1 style={{margin: '30px'}}>Action en cours. Patientez svp...</h1>
                <Button onClick={()=>setRoute('/personnel')} intent='warning'  minimal={true}> ⬅️ Go back</Button>
                <Spinner />
            </>
        ) ;
    }

    const registerUser = () => {
        let newDate_  = new Date(mydate);
        const myNumFormatter = (num, nbr) => ("0" + num).slice(-nbr);

        let newdate_ =  myNumFormatter(newDate_.getFullYear(), 4) + '/' +  myNumFormatter(newDate_.getMonth() + 1, 2)  + '/' +  myNumFormatter(newDate_.getDate(), 2) ;
             
        regDeplacer({personID : profile._id, date : newdate_, fromTime : myftime, toTime : myetime, motif : motif})
    }

    return (<>
     
        {/* <Container>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col>
                    Selected Profile : 
                </Col>
            </Row>
        </Container> */}

       
        
        <div className="d-flex w-100 h-100 profileCover" style={{color: "#012121"}}>
            <div id="aside">
                <div className="asideTitle">
                    Profile 
                </div>
                <div className="asideActions">
                    <Button minimal={true} disabled={true} style={{color: '#313131', fontWeight: 500,fontSize: '1.14em'}} large={true} className='asideBtn'>
                        🖨️ Imprimer le se-déplacer !
                        (Accorder d'abord) 
                    </Button>
                   
                    
                    <hr style={{backgroundColor : 'whitesmoke', color: 'whitesmoke'}} />
                    <Button minimal={true} disabled={true} style={{color: '#313131', fontWeight: 500,fontSize: '1.14em'}}  large={true} className='asideBtn'>
                        💦 Liste des se-déplacers d'ajourd'hui
                        (Accorder d'abord) {date_}
                    </Button>
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
                        <img className='col' src={avatar} width='max-content' height='auto' alt='' />   
                        <h4 className='col m-auto'>{profile.grade} {profile.nom} {profile.prenom}</h4>
                    </div>
                    <hr />
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
                                    value={mydate} 
                                    defaultValue={date_}
                                    onChange={(e) => setMydate(e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row className='mr-3'>
                            <Label size='lg' xs={12} sm={3} for='date'>
                                De (heure / minute) : 
                            </Label>
                            <Col>
                                <Input 
                                    type="time" 
                                    sm={4}
                                    bsSize="lg"
                                    placeholder={'13:00'}
                                    value={myftime}
                                    onChange={(e) => setMyftime(e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row className='mr-3'>
                            <Label size='lg' xs={12} sm={3} for='date'>
                                Jusqu'à :
                            </Label>
                            <Col>
                                <Input 
                                    type="time" 
                                    sm={4}
                                    bsSize="lg"
                                    placeholder={'14:30'}
                                    value={myetime} 
                                    onChange={(e) => setMyetime(e.target.value)}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row className='mr-3'>
                            <Label size='lg' xs={12} sm={3} for='date'>
                                Pour motif :
                            </Label>
                            <Col>
                                <Input 
                                    type="text" 
                                    sm={4}
                                    bsSize="lg"
                                    placeholder={'Affaire bancaire.'}
                                    value={motif}
                                    onChange={(e) => setMotif(e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        <Button type='button' fill={true} large={true} onClick={
                            () => 
                                registerUser()
                            }
                            >🆗 Accorder </Button>
                    </Form>
                    <Button onClick={()=>setRoute('/personnel')} intent='warning' style={{position: 'absolute', right: '30px', bottom: '30px', width: '100px'}} minimal={true}> ⬅️ Go back</Button>
                </div>
            </div> 
        </div>
    </>)
};

export default connect(mapStateToProps, mapDispatchToProps)(Deplacer);