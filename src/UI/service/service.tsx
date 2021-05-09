import React, { useEffect, useState } from 'react';
import { register, setLogin, setRoute, usernameExist } from '../store/Actions/actionCreator';
import '../styles/service.css';
import avatar from './images/avatar-svgrepo-com.svg';

import {connect} from 'react-redux'
import { Button, Col, Form, FormGroup, Input, Jumbotron, Label, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Nav, NavItem, NavLink } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { checkIcon } from '../icons';

const data = [
    {
        id: 1, 
        grade : 'EV2',
        nom: 'Personne 1', 
        prenom : 'personne.',
        summary: 'total Jours 11',  
        year: '1982', 
        expanderDisabled: true, 
        image: 'http://conan.image.png' 
    }
];
const columns = [
    {
        name : 'Grade',
        sortable: true,
        selector : 'grade',
    },
  {
    name: 'IDENTIFIANT',
    sortable: true,
    cell: row => <div><div style={{ fontWeight: 700 }}>{ String(row.nom).toUpperCase() + ' ' + row.prenom}</div>{row.summary}</div>,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
    right: true,
  },
];
 
// The row data is composed into your custom expandable component via the data prop
const ExpandableComponent = ({ data }) => <img src={data.image} />;

const mapStateToProps = (state ) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRoute : (route) => 
                            dispatch(setRoute(route)),
    }
}

const Service = ({setRoute}) => {

    let [PORT, setPORT ] = useState('');
    let [version, setVersion ] = useState("");

    var today = new Date(),

    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const pushTransaction = () => 
    {
        // ipcRenderer.send('pushTransaction', {
        //     sender : 10229,
        //     data : 'THIS IS SOME HASH DATA REFERRING TO ANY POSSIBLE COMBINATION OF ENTROPY.',
        //     signature : 'RND SIG',
        // });
    }

    let ctnStyle = {
        overflowX: 'hidden', 
        overflowY: '-moz-hidden-unscrollable', 
        marginTop: '50px', 
        marginBottom: '50px', 
        maxHeight: '80vh', 
        width: '90vh', 
        paddingRight: '20px'
    } as React.CSSProperties;
    
    return (
        <div className="serviceCover w-100 h-100">
            <div style={ctnStyle} className='m-1 p-1 w-100 h-100 '>
                
                <Nav pills className='m-2 p-1'>
                    <NavItem>
                        <NavLink active href="#">Liste d'aujourd'hui</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href="#">Définir ordre de bordées</NavLink>
                    </NavItem>
                  
                    <NavItem>
                        <NavLink href="#" style={{color: 'whitesmoke'}}>Ajouter personne</NavLink>
                    </NavItem>
                   
                    <NavItem>
                        <NavLink href="#" style={{color: 'whitesmoke'}}>Retrancher personne</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href="#" style={{color: 'whitesmoke'}}>Imprimer liste</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href="#" style={{color: 'whitesmoke'}} onClick={() => setRoute('/Configurerservice')}>Configurer bordées</NavLink>
                    </NavItem>
                </Nav>
                <h1 className="">
                    Service du personnel
                </h1>
                <hr />
                <DataTable
                    title={"Liste de service pour le " + date} 
                    theme='dark'
                    columns={columns}
                    data={data}
                    sortIcon={checkIcon}
                    onSelectedRowsChange={() => {}}
                    expandableRows
                    expandableRowsComponent={<ExpandableComponent data={null}/>}
                    className='w-90'
                />

            </div>
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);