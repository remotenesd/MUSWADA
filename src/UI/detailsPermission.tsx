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

const { ipcRenderer } = window.require("electron");

const mapStateToProps = (state) => {    
    return {
      session: state.sessionReducer.user,
      listPers : state.rgReducer.basicList,
      profile : state.rgReducer.profile,
      lastPrintedPdf : state.rgReducer.lastPrintedPdf,
      lastPrintedID : state.rgReducer.lastPrintedID,
      resPermissionDu : state.rgReducer.resPermissionDu,
    };
};
  
const mapDispatchToProps = (dispatch) => ({
    setRoute : (route) => 
      dispatch(setRoute(route)),
    profilesm1 : (profile) => dispatch({type : 'profilesm1', data : {profile : profile}}),
    listdu : (date_) => dispatch({type : 'listduPermission', payload : {date_ : date_}}),
    clearprofile : () => dispatch({type : 'clearprofile'}),
});

const DetailsPermission = ({route, profile, setRoute, resPermissionDu, profilesm1, clearprofile, printProfile, lastPrintedPdf, lastPrintedID, listdu}) => {

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

    const perm = generals.selectedPermission;

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