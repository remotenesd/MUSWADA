import React, { useEffect, useState } from 'react';
import { register, setLogin, setRoute, usernameExist } from '../store/Actions/actionCreator';
import '../styles/service.css';
import avatar from './images/avatar-svgrepo-com.svg';

import {connect} from 'react-redux'

import { FormGroup, H5, Navbar, InputGroup, Intent, Switch, ControlGroup, Button, HTMLSelect } from "@blueprintjs/core";

import DataTable from 'react-data-table-component';
import { checkIcon } from '../icons';
import { Nav, NavItem, NavLink } from 'reactstrap';

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
        usernameExist : state.sessionReducer.usernameExist,
        registeredUser : state.sessionReducer.registeringUser,
        registerSuccess : state.sessionReducer.registerSuccess,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRoute : (route) => 
                            dispatch(setRoute(route)),
    }
}

const Configurer = ({setRoute}) => {

    const [bordee, setBordee ] = useState('bordée 1');
    const [version, setVersion ] = useState("");

    const today = new Date(),

    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const pushTransaction = () => 
    {
        // ipcRenderer.send('pushTransaction', {
        //     sender : 10229,
        //     data : 'THIS IS SOME HASH DATA REFERRING TO ANY POSSIBLE COMBINATION OF ENTROPY.',
        //     signature : 'RND SIG',
        // });
    }

    const ctnStyle = {
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
                        <NavLink href="#"  onClick={() => setRoute('/service')}>Liste d'aujourd'hui</NavLink>
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
                        <NavLink href="#" active style={{color: 'whitesmoke'}}>Configurer bordées</NavLink>
                    </NavItem>
                </Nav>

                <hr />

                <h1 className="bp3-heading bp3-dark">
                    Liste de bordées
                </h1>


                {/* <FormGroup>
                    <InputGroup className='px-5'>
                        <InputGroupAddon addonType='prepend'>Trouver bordées portant nom </InputGroupAddon>
                        <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                        <InputGroupAddon addonType="append"><Button color="secondary">Selectionner</Button></InputGroupAddon>
                    </InputGroup>


                    <InputGroup className='px-5'>
                        <InputGroupAddon addonType='prepend'>Selectionner personne </InputGroupAddon>
                        <Input type="text" name="select" id="exampleSelect" />
                        <InputGroupAddon addonType="append"><Button disabled={true} color="secondary">⏬ Ajouter</Button></InputGroupAddon>
                        <InputGroupAddon addonType="append"><Button disabled={true} color="secondary">✂️ Retrancher</Button></InputGroupAddon>
                    </InputGroup>
                </FormGroup> */}

        
                <ControlGroup fill={true}>
                    <Button icon="filter">Bordée a selectionner : </Button>
                    <HTMLSelect options={['', 'premiere', 'deuscieme']} />
                    <InputGroup placeholder="Trouver personne !" disabled={true} />
                    <Button icon="add">Ajouter a la bordée</Button>   
                    <Button icon="ban-circle">Retirer de la bordée</Button>
                </ControlGroup>

                
                <hr />
                <DataTable
                    title={"Liste de " + bordee} 
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

export default connect(mapStateToProps, mapDispatchToProps)(Configurer);