/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

import React, { useState } from 'react';
import {globals, globalsChangedEvents, generals} from './helpers/globals';
import { Container, Row, Col, Media } from 'reactstrap';
import {Button, Spinner, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Classes} from '@blueprintjs/core';
import { questionIcon } from './icons';
import {connect} from 'react-redux'


import './styles/personnel.css';
import avatar from './images/avatar-svgrepo-com.svg';
import { setRoute } from './store/Actions/actionCreator';
import { PERSONNEL_LIST_PERSONNEL, PERSONNEL_PROFILE_SM1, PERSONNEL_PRINT_PROFILE_DIGITAL, PERSONNEL_PRINT_PROFILE_PRINTER } from './store/Actions/actionTypes';

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
    getPersonnel : () => dispatch({type : PERSONNEL_LIST_PERSONNEL}),
    profilesm1 : (profile) => dispatch({type : PERSONNEL_PROFILE_SM1, data : {profile : profile}}),
    printProfile : (profile) => dispatch({type : PERSONNEL_PRINT_PROFILE_DIGITAL, data : {profile : profile}}),
    printProfilePrinter : (profile) => dispatch({type : PERSONNEL_PRINT_PROFILE_PRINTER, data : {profile : profile}}),
});

const Profile = ({route, profile, setRoute, printProfile, printProfilePrinter, lastPrintedPdf, lastPrintedID}) => {

    const [PORT, setPORT ] = useState(globals.apiPort);
    const [version, setVersion ] = useState(globals.version);
    const selectedProfile = generals.selectedProfile!;

    console.log(lastPrintedPdf)
    console.log(lastPrintedID)

    // console.log(generals.selectedProfile)
    
    globalsChangedEvents.push( 
        () => {
            setPORT(globals.apiPort);
            setVersion(globals.version);
        }
    );

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
                    <Button minimal={true}  
                            style={{color: 'black', fontWeight: 300,fontSize: '1.14em'}}  
                            large={true} 
                            onClick={() => setRoute('/ListpermissionDe')}
                            className='asideBtn'>
                        📰 Liste des permissions de {profile.grade} {profile.nom}
                    </Button>
                    <Button minimal={true}  
                            style={{color: 'black', fontWeight: 300,fontSize: '1.14em'}}  
                            large={true} 
                            onClick={() => setRoute('/ListpermissionDe')}
                            className='asideBtn'>
                        🗞️ Liste des se-deplacers de {profile.grade} {profile.nom}
                    </Button>
                    <Button minimal={true}  
                            style={{color: 'black', fontWeight: 500,fontSize: '1.14em'}}  
                            large={true} 
                            onClick={() => printProfilePrinter(profile)}
                            className='asideBtn'>
                        🖨️ Imprimer la fiche de renseignements
                    </Button>
                   
                    {
                        lastPrintedPdf !== undefined && lastPrintedPdf.length > 0  && (lastPrintedID._id === profile._id)
                        ?
                            <>
                                <Button minimal={true}   style={{color: 'black', fontWeight: 500,fontSize: '1.14em'}}  large={true}  
                                    onClick={() => {
                                        // printProfile(profile._id);
                                        ipcRenderer.send('downloadfile', {
                                            file : lastPrintedPdf,
                                        });
                                    }} 
                                    className='asideBtn'
                                    >
                                🎟️ Fichier prét ! Ouvrir le PDF
                                </Button>
                                <Button minimal={true}  style={{color: 'black', fontWeight: 500,fontSize: '1.14em'}}  large={true}  
                                    onClick={() => {
                                        ipcRenderer.send('downloadfile', {
                                            file : lastPrintedPdf.replace('pdf','docx'),
                                        });
                                    }} 
                                    className='asideBtn'
                                    >
                                📎 Fichier prét ! Ouvrir le format WORD
                                </Button>
                            </>
                        :
                            <Button minimal={true}  style={{color: 'black', fontWeight: 500,fontSize: '1.14em'}}  large={true}  
                                onClick={() => {
                                    console.log({_id : profile._id})
                                    printProfile(profile._id);
                                }}
                                className='asideBtn'>
                                📰 Garder la version digitale
                            </Button>
                    }
                    <hr style={{backgroundColor : 'whitesmoke', color: 'whitesmoke'}} />
                    <Button minimal={true}  style={{color: 'black', fontWeight: 500,fontSize: '1.14em'}} 
                        onClick={() => setRoute('/Deplacer')}
                        large={true} className='asideBtn'>
                        🚶 Accorder un se-deplacer
                    </Button>
                    <Button minimal={true}  style={{color: 'black', fontWeight: 500,fontSize: '1.14em'}} 
                        onClick={() => setRoute('/regpermission')}
                        large={true} className='asideBtn'>
                        🧳 Accorder une permission
                    </Button>
                    
                    <hr style={{backgroundColor : 'whitesmoke', color: 'whitesmoke'}} />
                    <Button minimal={true}  style={{color: 'black', fontWeight: 500,fontSize: '1.14em'}}  large={true}  
                        onClick={() => setRoute('/personnel')}
                        className='asideBtn'>
                            ↙️ Retour
                    </Button>
                    </div>
            </div>
            <div className="maindPers" style={{paddingTop: '20px'}}>
                {/* <h1>
                    Fiche individuelle de {profile.nom}
                </h1> */}
                
                <div className='float-left bg-secondary m-3 p-1 rounded'>
                    <h3 className=''>🕶️ Fiche individuelle de {profile.grade} {profile.nom}</h3>
                </div>
                <hr />
                <div className="container w-100 h-75 m-5" style={{overflowY: 'auto', overflowX: 'hidden'}}>
                    <div className='row w-25' style={{minHeight: '10rem', position: 'absolute', right: '20px', top: '50px' }}>
                        <img className='col' src={avatar} width='max-content' height='auto' alt='' />   
                        <h4 className='col m-auto'>{profile.grade} {profile.nom} {profile.prenom}</h4>
                    </div>
                    <hr />
                    <p style={{fontSize: '1.4em' , fontStretch: 'ultra-expanded', fontStyle: 'normal', lineHeight: '40px'}}>
                        🥢 <em>Grade et nom :</em> {profile.grade} {profile.nom} {profile.prenom}
                        <br />
                        - Email : {profile.email}
                        <br />
                        ☎️ Tel : {profile.tel}
                        <br />
                        - Matricule : {profile.matricule}
                        <br />
                        👷‍♂️ Fonction : {profile.fonction}
                        <br />
                        📆 Promotion : {profile.promotion}
                        <br />
                        <br />
                        👶 Naissance le {profile.datenaissance} a {profile.villenaissance}
                        <br />
                        📩 Numero de carte nationale : {profile.cni}
                        
                        <br />
                        <br />
                        🧒 Enfants : 
                        {
                            profile.enfants !== undefined ?
                            (     
                                profile.enfants.length === 0 || (profile.enfants.length < 2 && profile.enfants[0].length < 2)
                                ?
                                " Aucun"
                                : 
                                profile.enfants
                            )
                            : " Aucun."
                        }

                        <br />
                        <br />

                        🏫 Ecoles <em>militaires </em> :
                        {
                            profile.ecolesmilitaires !== undefined ?
                            (     
                                profile.ecolesmilitaires.length === 0 || 
                                    (profile.ecolesmilitaires.length < 2 && profile.ecolesmilitaires[0].length < 2)
                                ?
                                " Aucune"
                                : 
                                profile.ecolesmilitaires
                            )
                            : " Aucune."
                        }
                        <br />
                        🏫 Ecoles <em>civiles </em> :
                        {
                            profile.ecolesciviles !== undefined ?
                            (     
                                profile.ecolesciviles.length === 0 || (profile.ecolesciviles.length < 2 && profile.ecolesciviles[0].length < 2)
                                ?
                                " Aucune"
                                : 
                                profile.ecolesciviles
                            )
                            : " Aucune."
                        }
                        <br />
                        <br />
                        🏘️ <em>Addresse</em> : {profile.addresse}
                        <br />
                        📱 <em>Personne en charge</em> : {profile.personneEnCharge}
                        <br />
                        - <em>Addresse</em> : {profile.addresse}
                    </p>
                    <Button onClick={()=>setRoute('/personnel')} intent='warning' style={{position: 'absolute', right: '30px', bottom: '30px', width: '100px'}} minimal={true}> ⬅️ Go back</Button>
                </div>
            </div> 
        </div>
    </>)
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);