/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

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
import { PERSONNEL_CLEAR_PROFILE, PERSONNEL_LIST_PERMISSION_DU, PERSONNEL_PERMISSION_PDF, PERSONNEL_PROFILE_SM1, PERSONNEL_RESET_FLAGS } from './store/Actions/actionTypes';
import { baseperson } from './register/core';

const { ipcRenderer } = window.require("electron");

const mapStateToProps = (state) => {    
    return {
      session: state.sessionReducer.user,
      listPers : state.rgReducer.basicList,
      profile : state.rgReducer.profile,
      lastPrintedPdf : state.rgReducer.lastPrintedPdf,
      lastPrintedID : state.rgReducer.lastPrintedID,
      resPermissionDu : state.rgReducer.resPermissionDu,
      permissionPDF : state.rgReducer.permissionPDF,
      permissionPDFFile : state.rgReducer.permissionPDFFile,
    };
};
  
const mapDispatchToProps = (dispatch) => ({
    setRoute : (route) => 
      dispatch(setRoute(route)),
    profilesm1 : (profile) => dispatch({type : PERSONNEL_PROFILE_SM1, data : {profile : profile}}),
    listdu : (date_) => dispatch({type : PERSONNEL_LIST_PERMISSION_DU, payload : {date_ : date_}}),
    clearprofile : () => dispatch({type : PERSONNEL_CLEAR_PROFILE}),
    permission2pdf : (data) => dispatch({type : PERSONNEL_PERMISSION_PDF, payload : {...data}}),
    resetFlags : () => dispatch({type : PERSONNEL_RESET_FLAGS}),
});

const DetailsPermission = (
    {
        route, profile, setRoute, resPermissionDu, permissionPDF, permissionPDFFile, listPers,
        profilesm1, clearprofile, printProfile, 
        lastPrintedPdf, lastPrintedID, listdu, permission2pdf, resetFlags,
    }) => {

    const today = new Date();
    const myNumFormatter = (num, nbr) => ("0" + num).slice(-nbr);
    const date_ =  myNumFormatter(today.getFullYear(), 4) + '/' +  myNumFormatter(today.getMonth() + 1, 2)  + '/' +  myNumFormatter(today.getDate(), 2) ;
    const [seldate, setSeldate] = useState('');

 
    useEffect(() => {
        console.log('// \\setting date !')
        // setSeldate(date_);
        console.log(seldate);
        const newDate_ = new Date(seldate);
        const newdate_ =  myNumFormatter(newDate_.getFullYear(), 4) + '/' +  myNumFormatter(newDate_.getMonth() + 1, 2)  + '/' +  myNumFormatter(newDate_.getDate(), 2) ;
        listdu(newdate_);  
    }, [seldate]);

    const perm = generals.selectedPermission;
    
    const openDOCFile = (lastPrintedPdf) => {
        ipcRenderer.send('downloadfile', {
            file : lastPrintedPdf,
        });
    }
    
    if (permissionPDFFile.length > 0) // or use permissionPDF
    {
        openDOCFile(permissionPDFFile);
        resetFlags()
    }

    const genPDF = (lieu : string) => {
        if (!perm)
        {
            return;
        }
        let person = listPers?.filter(pers => pers.id === perm.personID)
        if (person.length < 1){
            return;
        }
        person = person[0]
        const pers : baseperson = person

        const fromdate = Date.parse(perm.fromDate)
        const todate = Date.parse(perm.toDate)
        let duree = (todate - fromdate) / (1000 * 3600)

        let dureeSTR = ""
        if (duree < 30)
        {
            dureeSTR = "24 heures"
        }
        else if (duree < 40)
        {
            dureeSTR = "36 heures"
        }
        else if (duree < 55)
        {
            dureeSTR = "48 heures"
        }
        else if (duree < 80)
        {
            dureeSTR = "72 heures"
        }
        else{
            duree = duree / 24
            duree = Math.floor(duree) + 1
            dureeSTR = duree + " jours."
        }


        const data = {
            "nomprenom" : String(pers.nom).toLocaleUpperCase() + " " + pers.prenom,
            "grade" : pers.grade,
            "duree" : String(dureeSTR),
            "valableDu" : perm.fromDate,
            "valableAu" : perm.toDate,
            "allerDe" : lieu,
            "allerA" : perm.addresse,
            "lieu" : lieu,
        }

        permission2pdf(data);

    }

    // console.log(listDu);

    return (<>
        
        <div className="d-flex w-100 h-100 profileCover" style={{color: "#012121"}}>
            <div id="aside">
                <div className="asideTitle">
                    Permissions
                </div>
                <div className="asideActions">
                    <Button
                       
                        minimal={true} style={{color: 'black', fontWeight: 500,fontSize: '1.14em'}} large={true} className='asideBtn'>
                        🖨️ Imprimer la permission
                    </Button>
                    <Button
                       onClick={() => {genPDF("casa")}}
                        minimal={true} style={{color: 'black', fontWeight: 500,fontSize: '1.14em'}} large={true} className='asideBtn'>
                        💾 Enregister comme fichier PDF
                    </Button>
                   
                    
                    <hr style={{backgroundColor : 'whitesmoke', color: 'whitesmoke'}} />
                    
                    <Button minimal={true} style={{color: 'black', fontWeight: 500,fontSize: '1.14em'}}  large={true}  
                        onClick={() => setRoute('/Permissionnaires')}
                        className='asideBtn'>
                            ↙️ Retour a la liste.
                    </Button>
                </div>
            </div>
            <div className="maindPers" style={{paddingTop: '20px'}}>
                {/* <h1>
                    Fiche individuelle de {profile.nom}
                </h1> */}
                
                <div className='float-left bg-secondary m-3 p-1 rounded'>
                    <h3 className=''>En permission</h3>
                </div>
                <hr />
                <div className="container w-100 h-75 m-5" style={{overflowY: 'auto', overflowX: 'hidden'}}>
                    <div className='row w-25' style={{minHeight: '10rem', position: 'absolute', right: '20px', top: '50px' }}>
                        <img className='col' src={papersvg} width='max-content' height='auto' alt='' />   
                    </div>
                    <hr />
                    <h2>
                        Permission de sortie de : <em>{perm ? perm.appelation :  '' }</em>
                    </h2>
                    <h3>
                        Sortant le : <b>{perm ? perm.fromDate :  <Spinner />}</b>
                    </h3>
                    <h3>
                        Rentrant le : <b>{perm ? perm.toDate :  <Spinner />}</b>
                    </h3>
                    <h3>
                        Addresse : <b>{perm ? perm.addresse :  <Spinner />}</b>
                    </h3>
                    <a onClick={() => setRoute('/profile')} >Aller au profile de {perm ? perm.appelation :  '' }</a>
                    <Button onClick={()=>setRoute('/Permissionnaires')} intent='warning' style={{position: 'absolute', right: '30px', bottom: '30px', width: '100px'}} minimal={true}> ⬅️ Go back</Button>
                </div>
            </div> 
        </div>
    </>)
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPermission);