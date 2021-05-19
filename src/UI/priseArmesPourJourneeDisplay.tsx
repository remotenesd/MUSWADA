/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Table } from 'reactstrap';
import {Button, Spinner} from '@blueprintjs/core';
import {connect} from 'react-redux'

import './styles/armes.css';
import { setRoute } from './store/Actions/actionCreator';
import { PERSONEL_DEPLACER_LIST_DU, PERSONNEL_CLEAR_PROFILE, PERSONNEL_DOC_PRISE_ARMES_JOURNEE, PERSONNEL_GET_PRISE_ARMES_JOURNEE, PERSONNEL_LIST_PERMISSION_DU, PERSONNEL_PROFILE_SM1, PERSONNEL_RESET_FLAGS } from './store/Actions/actionTypes';
import { armesManagerPourJournee } from './service/core';
const { ipcRenderer } = window.require("electron");

const mapStateToProps = (state) => {    
    return {
        listPers : state.rgReducer.basicList,
        priseArmesJournee : state.rgReducer.priseArmesJournee,
        priseArmesJourneeEcrite : state.rgReducer.priseArmesJourneeEcrite,
        listPermissionsJournee : state.rgReducer.resPermissionDu,
        listDeplacerJournee : state.rgReducer.listDu,
        priseArmesJourneeDocFile : state.rgReducer.priseArmesJourneeDocFile,
    };
};
  

const mapDispatchToProps = (dispatch) => ({
    setRoute : (route) => 
      dispatch(setRoute(route)),
    getPriseArmesJournee : (date_) => dispatch({type : PERSONNEL_GET_PRISE_ARMES_JOURNEE, payload : {date_ : date_}}),    
    getListPermissionJournee : (date_) => dispatch({type : PERSONNEL_LIST_PERMISSION_DU, payload : {date_ : date_}}),
    getListDeplacerJournee : (date_) => dispatch({type : PERSONEL_DEPLACER_LIST_DU, payload : {date_ : date_}}),
    docPriseArmesJournee : (els) => dispatch({type : PERSONNEL_DOC_PRISE_ARMES_JOURNEE, payload:  {...els}}),
    resetFlags : () => dispatch({type : PERSONNEL_RESET_FLAGS}),
    profilesm1 : (profile) => dispatch({type : PERSONNEL_PROFILE_SM1, data : {profile : profile}}),
    clearprofile : () => dispatch({type : PERSONNEL_CLEAR_PROFILE}),
});

let sentReq = false;
let armer : armesManagerPourJournee | null = null;

const PriseArmesPourJourneeDisplay = 
    (
        {
            priseArmesJournee,  priseArmesJourneeDocFile, listPers, listPermissionsJournee, listDeplacerJournee,
            setRoute, getPriseArmesJournee, getListPermissionJournee, getListDeplacerJournee, 
            docPriseArmesJournee, resetFlags, clearprofile, profilesm1
        }) => {

    const [expandedMenu, setExpandedMenu] = useState(false);

    const today = new Date();
    const myNumFormatter = (num, nbr) => ("0" + num).slice(-nbr);
    const date_ =  myNumFormatter(today.getFullYear(), 4) + '/' +  myNumFormatter(today.getMonth() + 1, 2)  + '/' +  myNumFormatter(today.getDate(), 2) ;
    
    if (!sentReq)
    {
        getListPermissionJournee(date_);
        getListDeplacerJournee(date_);
        getPriseArmesJournee(date_);
        sentReq = true
    }

    if (armer === null)
    {
        console.log("1034 looking for armer")
        armer = new armesManagerPourJournee(listPers, priseArmesJournee, listPermissionsJournee, listDeplacerJournee);
    }

    try{
        priseArmesJournee.permission = listPermissionsJournee.map(el => el.personID)
        priseArmesJournee.deplacer = listDeplacerJournee
    }catch {}
    

    const openDOCFile = (lastPrintedPdf) => {
        ipcRenderer.send('downloadfile', {
            file : lastPrintedPdf,
        });
    }
    
    if (priseArmesJourneeDocFile.length > 0)
    {
        openDOCFile(priseArmesJourneeDocFile);
        resetFlags()
    }

    const handleClick = (id_) =>
    {
        clearprofile();
        profilesm1(id_);
        setRoute('/profile')
    }
    let i = 0
    const returnTable = (elName, nom) => {
        return (<div className="element">
                        <h4>{nom} : <em>{elName != undefined ? elName.length : 0}</em></h4>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Grade</th>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    priseArmesJournee != undefined ? elName.map(el => 
                                        {
                                            i += 1;
                                            const ele = listPers.filter(f => f.id === el)[0]
                                            return (
                                                <tr key={ele.id} onClick={() => handleClick(el) }>
                                                    <td><em>{i}</em></td>
                                                    <td>{ele.grade}</td>
                                                    <td>{ele.nom}</td>
                                                    <td>{ele.prenom}</td>
                                                </tr>
                                            )
                                        }  
                                    ) : <></>
                                }
                                <hr />
                                
                            </tbody>
                        </Table>
                    </div>)
    }

    const returnPermission = (elName, nom) => {
        return (<div className="element">
                        <h4>{nom}</h4>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Qui ?</th>
                                    <th>A sorti le</th>
                                    <th>Rentrera le</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    priseArmesJournee != undefined ? elName.map(el => 
                                        {
                                            i += 1;
                                            return (
                                                <tr key={el.id}>
                                                    <td><em>{i}</em></td>
                                                    <td>{el.appelation}</td>
                                                    <td>{el.fromDate}</td>
                                                    <td>{el.toDate}</td>
                                                </tr>
                                            )
                                        }  
                                    ) : <></>
                                }
                                <hr />
                                
                            </tbody>
                        </Table>
                    </div>)
    }

    const showMenu = () =>
    {
        document.getElementById("asider")?.classList.add("asideExpanded")
        setExpandedMenu(true);
    }
    
    const hideMenu = () =>
    {
        document.getElementById("asider")?.classList.remove("asideExpanded");
        setExpandedMenu(false)
    }

    showMenu.bind(this)
    hideMenu.bind(this)

    const retractedMenu = () => {
        return (
            <>
                <h1 className="verticalText">
                    GLISSER ICI POUR MENU
                </h1>
            </>
        )
    }

    const getExpandedMenu = () => {
        return (
            <>
                <div className="asideTitle">
                    MENU
                </div>
                <div className="asideActions">
                    <Button
                        minimal={true} style={{ color: 'var(--color-solid)', fontWeight: 500,fontSize: '1.14em', textAlign: 'center'}} 
                        large={true} className='asideBtn'
                        onClick={() => docPriseArmesJournee(priseArmesJournee)}
                        >
                        🖥️ Garder au format WORD
                    </Button>
                    <Button
                        minimal={true} style={{ color: 'var(--color-solid)', fontWeight: 500,fontSize: '1.14em', textAlign: 'center'}} 
                        large={true} className='asideBtn'>
                        🖨️ Imprimer cette liste !
                    </Button>
                    
                   
                    
                    <hr style={{backgroundColor : 'whitesmoke', color: 'whitesmoke'}} />

                    <Button
                        minimal={true} style={{ color: 'var(--color-solid)', fontWeight: 500,fontSize: '1.14em', textAlign: 'center'}} 
                        large={true} className='asideBtn'>
                        🗑️ Annuler et refaire
                    </Button>
                    
                    <Button minimal={true} style={{color: 'var(--color-solid)', fontWeight: 500,fontSize: '1.14em', textAlign: 'center'}}  
                    large={true}  
                        onClick={() => setRoute('/personnel')}
                        className='asideBtn'>
                            ↙️ Retour a la liste de personnel.
                    </Button>
                </div>
            </>
        )
    }
 
    return (<>
        
        <div className="d-flex w-100 h-100 armesCover" style={{color: "#012121"}}>
            <div id="asider" className="asideSmall" onMouseOver={(event) => showMenu()} onMouseLeave={hideMenu.bind(this)}>
                {
                    expandedMenu ? 
                    getExpandedMenu()
                    :
                    retractedMenu()
                }
                
            </div>
            <div className="maindPers w-100" style={{paddingTop: '20px'}}>
                {/* <h1>
                    Fiche individuelle de {profile.nom}
                </h1> */}
                
                <div className='float-left bg-secondary w-100 m-3 p-1 rounded'>
                    <h3 className=''>⚔️ Prise d'armes du {date_}</h3>
                    <h5>
                        Voici la prise d'armes de cette journee
                    </h5>
                </div>
                <hr />
                <div className="container2 w-100 h-75 m-auto" style={{overflowY: 'auto', overflowX: 'auto'}}>
                    <div className="elementBig">
                        <h3>
                            En bref : 
                        </h3>
                        {
                                armer != null ? armer.debrief().split('\n').map(line => <p>{line}</p>) :  <Spinner />
                        }
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnTable(priseArmesJournee.officierGarde, "Officiers de garde") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnTable(priseArmesJournee.maitreService, "Maitres de service") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnTable(priseArmesJournee.quartCoupee, "Quart a la coupee") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnTable(priseArmesJournee.quartMachine, "Quart a la machine") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnTable(priseArmesJournee.capitaineArme, "Capitaine d'armes") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnTable(priseArmesJournee.radioService, "Radio de service") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnTable(priseArmesJournee.infirmier, "Infirmiers") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnTable(priseArmesJournee.sc, "S/C") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnTable(priseArmesJournee.maitreHotel, "Maitres d'hotel") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnTable(priseArmesJournee.maitreService, "Cuisiniers") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnTable(priseArmesJournee.maitreService, "Boulongers") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnTable(priseArmesJournee.maitreService, "Comie") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnPermission(listPermissionsJournee, "En permission") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnPermission(priseArmesJournee.ronde, "Rondes") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnTable(priseArmesJournee.ptc, "PTC") : <></>}
                    </div>
                    <div className="element">
                        {priseArmesJournee != undefined ? returnTable(priseArmesJournee.absent, "Absents") : <></>}
                    </div>
                   
                    <br />
                    <br />
                    <br />
                   
                </div>
                <Button onClick={()=>setRoute('/personnel')} intent='warning' style={{position: 'absolute', right: '30px', bottom: '30px', width: '100px', backgroundColor: '#e1e1e1'}} minimal={true}> ⬅️ Go back</Button>
            </div> 
        </div>
    </>)
};

export default connect(mapStateToProps, mapDispatchToProps)(PriseArmesPourJourneeDisplay);