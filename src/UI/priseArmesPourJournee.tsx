import React, { useEffect, useState } from 'react';
import { Col, Form, FormGroup, Label, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Table } from 'reactstrap';
import {Button, Icon, Spinner} from '@blueprintjs/core';
import {connect} from 'react-redux'

import './styles/armes.css';
import { setRoute } from './store/Actions/actionCreator';
import { PERSONNEL_PROFILE_SM1, PERSONNEL_GET_PRISE_ARMES, PERSONNEL_SET_PRISE_ARMES } from './store/Actions/actionTypes';
import {armesManagerPourJournee} from './service/core';
import { baseperson } from './register/core';

const mapStateToProps = (state) => {    
    return {
      session: state.sessionReducer.user,
      listPers : state.rgReducer.basicList,
      priseArmes : state.rgReducer.priseArmes,
      priseArmesEtablie : state.rgReducer.priseArmesEtablie,
      priseArmesEcrite : state.rgReducer.priseArmesEcrite,
    };
};
  
const mapDispatchToProps = (dispatch) => ({
    setRoute : (route) => 
      dispatch(setRoute(route)),
    profilesm1 : (profile) => dispatch({type : PERSONNEL_PROFILE_SM1, data : {profile : profile}}),
    getPriseArmes : () => dispatch({type : PERSONNEL_GET_PRISE_ARMES}),
    setPriseArmes : (data) => dispatch({type : PERSONNEL_SET_PRISE_ARMES, payload : data}),
});


let armesMgr : (armesManagerPourJournee | undefined) = undefined;

const EditorComponent = ({armesMgr_state, armesMgr_getstate, armesMgr_addID, armesMgr_removeID, armesMgr_allPersonnel, title}) => {


    let [moker, setMocker] = useState(0);
    let [selectedOffGarde, setSelectedOffGarde] = useState(null as (baseperson | null) );

    let offGardeList = {}

    const getOffGardes = () => {
        let ind = 0;
        console.log(armesMgr_state)
        let fd = armesMgr_getstate();
        if (fd == undefined)
        {
            return <></>
        }
        return fd.map(pers => {
            ind += 1;
            return (
                <tr key={pers.id}>
                    <th scope="row">{ind}</th>
                    <td>{pers.grade}</td>
                    <td>{pers.nom}</td>
                    <td>{pers.prenom}</td>
                    <td style={{cursor: "pointer"}} onClick={() => {armesMgr_removeID(pers.id); setMocker(moker + 1);}}>❌</td>
                </tr>
            )
        });
    }

    const getOffGardeSupplement = () => {
        let ind = 0;
        let gardes = armesMgr_state;
        return (
            <tr key="10000">
                {
                    selectedOffGarde != null ?
                    <th style={{cursor: 'pointer'}} 
                        onClick={() => 
                            {
                                armesMgr_addID(selectedOffGarde?.id); 
                                setSelectedOffGarde(null)
                            }
                        } 
                        scope="row" >
                            ➕
                    </th>
                    :
                    <th scope="row" >❕</th>
                }
                <td>
                    <Label>{selectedOffGarde?.grade}</Label>
                </td>
                <td>
                    <Input type="select" onChange={e => setSelectedOffGarde(offGardeList[e.target.value])}>
                        <option>*</option>
                        {
                            armesMgr_allPersonnel.map(pers => {
                                if (!gardes.includes(pers.id))
                                {
                                    offGardeList[pers.id] = pers
                                    return (
                                        <option value={pers.id}>
                                            {String(pers.nom).toLocaleUpperCase()}
                                        </option>
                                    )
                                }
                        })
                        }
                    </Input>
                </td>
                <td>
                    <Label>{selectedOffGarde?.prenom}</Label>
                </td>
            </tr>
        )
    }

    return (
        <>
            <h3>
                {title} :
            </h3>
            <Table bordered hover>
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
                        getOffGardes()
                    }
                    <hr />
                    {
                        getOffGardeSupplement()
                    }
                </tbody>
            </Table>
        </>
    )

}

const PriseArmesPourJournee = ({session, listPers, priseArmes, priseArmesEtablie, priseArmesEcrite, setRoute, listdu, getPriseArmes, setPriseArmes}) => {

    const today = new Date();
    const myNumFormatter = (num, nbr) => ("0" + num).slice(-nbr);
    const date_ =  myNumFormatter(today.getFullYear(), 4) + '/' +  myNumFormatter(today.getMonth() + 1, 2)  + '/' +  myNumFormatter(today.getDate(), 2) ;
    let [seldate, setSeldate] = useState('');

    if (!priseArmesEtablie)
    {
        setRoute('/etablirPriseArmes') // todo set future prise armes editor page
    }

    if (armesMgr == undefined)
    {
        armesMgr = new armesManagerPourJournee(listPers)
    }

    useEffect(
        () => {
            if (priseArmesEcrite)
            {
                setRoute('/registerSuccess')
            }
        }
        , [priseArmesEcrite]
    )

    const sendData = () => {
        let compiled = armesMgr?.compileObject();
        setPriseArmes(compiled);
    }

    let EditorOffGarde = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToOffGardes(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        armesMgr_getstate : () => armesMgr?.getOfficiersGarde(),
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_state : armesMgr?.officiersGarde,
        title : 'Officiers de garde'
    })

    let EditorMaitresService = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToMaitresService(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        armesMgr_getstate : () => armesMgr?.getMaitresService(),
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_state : armesMgr?.maitresService,
        title : 'Maitres de service'
    })
    
    let EditorCDARMES = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToCapitaineArmes(id_),
        armesMgr_getstate : () => armesMgr?.getCDArmes(),
        armesMgr_state : armesMgr?.capitaineArme,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'Capitaine d\'armes'
    })
    
    let EditorBoulanger = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToBoulongier(id_),
        armesMgr_getstate : () => armesMgr?.getboulongier(),
        armesMgr_state : armesMgr?.boulongier,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'Boulongier'
    })

    let EditorAbsent = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToAbsent(id_),
        armesMgr_getstate : () => armesMgr?.getabsent(),
        armesMgr_state : armesMgr?.absent,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'Absents'
    })

    let EditorCuisinier = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToCuisinier(id_),
        armesMgr_getstate : () => armesMgr?.getcuisinier(),
        armesMgr_state : armesMgr?.cuisinier,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'Cuisiniers'
    })

    let EditorComie = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToComie(id_),
        armesMgr_getstate : () => armesMgr?.getComie(),
        armesMgr_state : armesMgr?.comie,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'Comie'
    })

    let EditorConsultation = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToConsultation(id_),
        armesMgr_getstate : () => armesMgr?.getconsultation(),
        armesMgr_state : armesMgr?.consultation,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'En consultation'
    })
   
    let EditorMaitreHotel = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToMaitreHotel(id_),
        armesMgr_getstate : () => armesMgr?.getmaitreHotel(),
        armesMgr_state : armesMgr?.maitreHotel,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'Maitres d\'hotel'
    })

    let EditorPTC = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToPTC(id_),
        armesMgr_getstate : () => armesMgr?.getptc(),
        armesMgr_state : armesMgr?.ptc,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'PTC'
    })

    let EditorQuartCoupee = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToQuartCoupee(id_),
        armesMgr_getstate : () => armesMgr?.getquartCoupee(),
        armesMgr_state : armesMgr?.quartCoupee,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'QUART A LA COUPEE'
    })

    let EditorQuartMachine = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToQuartMachine(id_),
        armesMgr_getstate : () => armesMgr?.getquartMachine(),
        armesMgr_state : armesMgr?.quartMachine,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'QUART A LA MACHINE'
    })

    let EditorRadioService = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToRadioService(id_),
        armesMgr_getstate : () => armesMgr?.getradioService(),
        armesMgr_state : armesMgr?.radioService,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'RADIO DE SERVICE'
    })

    let EditorRonde = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToRonde(id_),
        armesMgr_getstate : () => armesMgr?.getronde(),
        armesMgr_state : armesMgr?.ronde,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'RONDES'
    })

    let EditorSC = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToSC(id_),
        armesMgr_getstate : () => armesMgr?.getsc(),
        armesMgr_state : armesMgr?.sc,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'S/C'
    })

    let EditorStage = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToStage(id_),
        armesMgr_getstate : () => armesMgr?.getstage(),
        armesMgr_state : armesMgr?.stage,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'EN STAGE'
    })

    let EditorInfirmier = EditorComponent({
        armesMgr_addID : (id_) => armesMgr?.addToInfirmier(id_),
        armesMgr_getstate : () => armesMgr?.getinfirmier(),
        armesMgr_state : armesMgr?.infirmier,
        armesMgr_removeID : (id_) => armesMgr?.removeID(id_),
        armesMgr_allPersonnel : armesMgr?.allPersonnel,
        title : 'INFIRMIERS'
    })

    const renderUnregistered = () => {
        if (armesMgr?.notRegistered.length > 0)
        {
            let i = 0;
            return (
                <>
                    <h2>Personnel non inclus :</h2>
                    <Table bordered hover>
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
                                armesMgr?.getNonRegistered().map(el => 
                                    {
                                        i += 1;
                                        return (
                                            <tr key={el.id}>
                                                <td>{i}</td>
                                                <td>{el.nom}</td>
                                                <td>{el.prenom}</td>
                                            </tr>
                                        )
                                    } 
                                )
                            }
                            <hr />
                            
                        </tbody>
                    </Table>
                </>
            )
        }
        return <></>
    }

    return (<>
        
        <div className="d-flex w-100 h-100 armesCover" style={{color: "#012121"}}>
            <div className="asideSmall">
            <div className="asideTitle">
                    <Icon icon={'build'} iconSize={32} />
                </div>
                <div className="asideActions">
                    <Icon icon={'series-add'} iconSize={32} />
                    <br />
                    <Icon icon={'share'} iconSize={32} />
                </div>
            </div>
            <div className="maindPers w-100" style={{paddingTop: '20px'}}>
                {/* <h1>
                    Fiche individuelle de {profile.nom}
                </h1> */}
                
                <div className='float-left bg-secondary w-100 m-3 p-1 rounded'>
                    <h3 className=''>⚔️ Configurer prise d'armes du {date_}</h3>
                    <h5>
                        Pour pouvoir prochainement preparer les situations quotidiennes de prises d'armes,
                        veillez confirmer cette liste :
                    </h5>
                </div>
                <hr />
                <div className="container w-100 h-75 m-auto" style={{overflowY: 'auto', overflowX: 'auto'}}>
                    {renderUnregistered()}
                    <div className='flexTwo w-100'>
                        <div className='flexTwoGarde'>
                            {EditorOffGarde}
                        </div>
                        <div className="flexTwoGarde">
                            {EditorMaitresService}
                        </div>
                    </div>
                    <div className="flexTwo w-100">
                        <div className="flexTwoGarde">
                            {EditorCDARMES}
                        </div>
                        <div className="flexTwoGarde">
                            {EditorInfirmier}
                        </div>
                    </div>
                    <div className="flexTwo w-100">
                        <div className="flexTwoGarde">
                            {EditorSC}
                        </div>
                        <div className="flexTwoGarde">
                            {EditorComie}
                        </div>
                    </div>
                    <div className="flexTwo w-100">
                        <div className="flexTwoGarde">
                            {EditorBoulanger}
                        </div>
                        <div className="flexTwoGarde">
                            {EditorCuisinier}
                        </div>
                        <div className="flexTwoGarde">
                            {EditorMaitreHotel}
                        </div>
                    </div>
                    <div className="flexTwo w-100">
                        <div className="flexTwoGarde">
                            {EditorStage}
                        </div>
                        <div className="flexTwoGarde">
                            {EditorConsultation}
                        </div>
                        <div className="flexTwoGarde">
                            {EditorPTC}
                        </div>
                    </div>
                    <div className="flexTwo w-100">
                        <div className="flexTwoGarde">
                            {EditorAbsent}
                        </div>
                    </div>
                    <div className="flexTwo w-100">
                        <div className="flexTwoGarde">
                            {EditorRonde}
                        </div>
                    </div>
                    <div className="flexTwo w-100">
                        <div className="flexTwoGarde">
                            {EditorRadioService}
                        </div>
                    </div>
                    <div className="flexTwo w-100">
                        <div className="flexTwoGarde">
                            {EditorQuartCoupee}
                        </div>
                        <div className="flexTwoGarde">
                            {EditorQuartMachine}
                        </div>
                    </div>
                    
                    <br />
                    <br />
                    <br />
                   
                </div>
                <Button onClick={()=>{sendData();}} intent='primary' style={{position: 'absolute', right: '140px', bottom: '30px', width: '200px', backgroundColor: '#f1f1f1'}} minimal={true}> 📪 Confirmer</Button>
                <Button onClick={()=>setRoute('/personnel')} intent='warning' style={{position: 'absolute', right: '30px', bottom: '30px', width: '100px', backgroundColor: '#e1e1e1'}} minimal={true}> ⬅️ Go back</Button>
            </div> 
        </div>
    </>)
};

export default connect(mapStateToProps, mapDispatchToProps)(PriseArmesPourJournee);