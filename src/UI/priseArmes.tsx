import React, { useEffect, useState } from 'react';
import { Col, Form, FormGroup, Label, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import {Button, Icon, Spinner} from '@blueprintjs/core';
import papersvg from './images/paper.svg';
import {connect} from 'react-redux'

import './styles/armes.css';
import { setRoute } from './store/Actions/actionCreator';
import { PERSONNEL_PROFILE_SM1, PERSONNEL_GET_PRISE_ARMES, PERSONNEL_SET_PRISE_ARMES } from './store/Actions/actionTypes';

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

const PriseArmes = ({route, profile, setRoute, listdu, getPriseArmes, setPriseArmes}) => {

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

    return (<>
        
        <div className="d-flex w-100 h-100 armesCover" style={{color: "#012121"}}>
            <div className="asideSmall">
            <div className="asideTitle">
                    <Icon icon={'build'} iconSize={32} />
                </div>
                <div className="asideActions">
                    <Icon icon={'series-add'} iconSize={16} />
                    <Icon icon={'share'} iconSize={16} />
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
                  
                   
                    <Button onClick={()=>setRoute('/personnel')} intent='warning' style={{position: 'absolute', right: '30px', bottom: '30px', width: '100px'}} minimal={true}> ⬅️ Go back</Button>
                </div>
            </div> 
        </div>
    </>)
};

export default connect(mapStateToProps, mapDispatchToProps)(PriseArmes);