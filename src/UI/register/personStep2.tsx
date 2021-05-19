/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import { globals } from '../helpers/globals';
import { register, setLogin, setRoute, usernameExist } from '../store/Actions/actionCreator';
import '../styles/personnel.css';
import avatar from '../images/avatar-svgrepo-com.svg';

import {connect} from 'react-redux'
import { Button, Col, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';


const ntoC = (num : number) => {
    // switch (num)
    // {
    //     case 1:
    //         return "premier"
    //     case 2:
    //         return "deuscieme"
    //     case 3:
    //         return "troisieme"
    // }
    const nums = ["premier" , "deuscieme", "troisieme", "quatrieme", "cinquieme", "sixieme"]
    if (num < 6)
    {
        return nums[num] + ' enfant';
    }
    num = num + 1;
    return 'enfant num ' + num.toString();
}

const mapStateToProps = (state ) => {
    return {
        usernameExist : state.sessionReducer.usernameExist,
        curStep : state.rgReducer.rg.curStep,
        registered : state.rgReducer.rg.registered,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        doesUsernameExist : (username) => dispatch(usernameExist(username)),
        register : (user) => dispatch({type : 'S2', data :  user}),
        setRoute : (route) => 
                            dispatch(setRoute(route)),
    }
}

const Person = (
                    {
                        usernameExist , curStep, registered,
                        doesUsernameExist , register , setRoute
                    }
            ) => {

    const redStyle = {
        'color' : 'red'
    }    

    const [enfants, setEnfants] = useState([""] as Array<string>);
    const [ecolesciviles, setEcolesciviles] = useState([""] as Array<string>);
    const [ecolesmilitaires, setEcolesmilitaires] = useState([""] as Array<string>);
    const [addresse, setAddresse] = useState('');
    const [personneEnCharge, setPersonneEnCharge] = useState('');

    // useEffect(() => {
    //     if (registered)
    //     {
    //         setRoute('/personnel')
    //     }
    // }, [registered])

    const onAddresseChange = (e:any) =>
    {
        let v = String("");
        v = e.target.value;
        setAddresse(v);
    }

    const onEcoleChange = (id : number, ecole : string) => {
        const cp = Object.assign([""], ecolesciviles);
        cp[id] = ecole;
        console.log(id + " " + ecolesciviles.length)
        console.log(ecole);
        if (id + 1 === ecolesciviles.length)
        {
            cp.push('');
        }
        setEcolesciviles(cp);
    }


    const onEcoleChange2 = (id : number, ecole : string) => {
        const cp = Object.assign([""], ecolesmilitaires);
        cp[id] = ecole;
        console.log(id + " " + ecolesmilitaires.length)
        if (id + 1 === ecolesmilitaires.length)
        {
            cp.push('');
        }
        setEcolesmilitaires(cp);
    }

    const onEnfantsChange = (id : number, enf : string) => {
        const cp = Object.assign([""], enfants);
        cp[id] = enf;
        if (id + 1 === enfants.length)
        {
            cp.push('');
        }
        setEnfants(cp);
    }

    const sendData = () =>
    {
        // some checks TODO

        const user = {
            addresse : addresse,
            enfants : enfants,
            ecolesciviles : ecolesciviles,
            ecolesmilitaires : ecolesmilitaires,
            personneEnCharge : personneEnCharge,
        }

        register(user);
    }

    let ecl = -1;
    let ecl_ = -1;
    let ecl1 = -1;

    return (
        <div className="d-flex w-100 h-100 personCover px-5 py-2" style={{color: "#012121"}}>
            <div className="maindPers align-items-center justify-content-center overflow-scroll" style={{paddingTop: '20px'}}>
                <h1>
                    Etape { curStep } du processus
                </h1>
                <h3>
                    Continuer a fournir les informations supplémentaires 
                </h3>

                <br />
                <Form className=' my-2 py-1 ' style={{height: '70vh', overflowX: 'hidden', overflowY: 'scroll', marginBottom: '50px'}}>
                        <h3> * Informations de base : </h3>
                        
                        <FormGroup row>
                            <Label size="lg" sm={4} for="addresse">Addresse de l'interessé :</Label>
                            <Col>
                                <Input sm={8} bsSize="lg"
                                    type="text"
                                    name="addresse"
                                    id="addresse"
                                    placeholder="SM2"
                                    value={addresse.toString()}
                                    onChange={(e : any) => onAddresseChange(e)}
                                />

                            </Col>
                            {/* <Label style={redStyle} size="lg" sm={12} for="">{validateGrade()['reason']}</Label> */}
                        </FormGroup>

                        <FormGroup row>
                            <Label size="lg" sm={4} for="personne">Personne en charge en cas d'incident :</Label>
                            <Col>
                                <Input sm={8} bsSize="lg"
                                    type="text"
                                    name="personne"
                                    id="personne"
                                    placeholder="personne"
                                    value={personneEnCharge.toString()}
                                    onChange={(e : any) => setPersonneEnCharge(e.target.value)}
                                />

                            </Col>
                            {/* <Label style={redStyle} size="lg" sm={12} for="">{validateGrade()['reason']}</Label> */}
                        </FormGroup>

                        <h3> * Informations d'instruction : </h3>

                        {
                            ecolesciviles.map(ecolecivile => {
                                ecl += 1;
                                const mui = ecl as number;
                                return (
                                        <FormGroup row>  
                                            <Label size='lg' sm={4} for="ecole">Formation (Ecole civile, si oui)</Label>
                                            {
                                                mui === 0
                                                ?
                                                <Label size='lg' sm={4} for="ecole">Formation (Ecole civile, si oui)</Label>
                                                :
                                                <Label size='lg' sm={4} for="ecole">Ecole num {mui + 1} (s'il y a):</Label> 
                                            }
                                            <Col>
                                                <Input sm={8} bsSize="lg"
                                                        type="text"
                                                        name={"ecole" + mui}
                                                        id={"ecole" + mui}
                                                        value={ecolecivile as string}
                                                        onChange={(e : any) => onEcoleChange(mui, e.target.value)} 
                                                />
                                            </Col>
                                        </FormGroup>
                                )
                            })
                        }
                        <hr />
                        {
                            ecolesmilitaires.map(ecolecivile => {
                                ecl_ += 1;
                                const mui = ecl_ as number;
                                return (
                                        <FormGroup row>  
                                            <Label size='lg' sm={4} for="ecole">Formation (Ecole <b>Militaire</b>)</Label>
                                            {
                                                mui === 0
                                                ?
                                                <Label size='lg' sm={4} for="ecole">Formation (Ecole <b>Militaire</b>, si oui)</Label>
                                                :
                                                <Label size='lg' sm={4} for="ecole">Ecole <b>Militaire</b> num {mui + 1} (s'il y a):</Label> 
                                            }
                                            <Col>
                                                <Input sm={8} bsSize="lg"
                                                        type="text"
                                                        name={"ecolem" + mui}
                                                        id={"ecolem" + mui}
                                                        value={ecolecivile as string}
                                                        onChange={(e : any) => onEcoleChange2(mui, e.target.value)} 
                                                />
                                            </Col>
                                        </FormGroup>
                                )
                            })
                        }
                        <hr />
                        <h3> * Informations de famille : </h3>
                        {
                            enfants.map(enfant => {
                                ecl1 += 1;
                                const mui = ecl1 as number;
                                return (
                                        <FormGroup row>  
                                            <Label size='lg' sm={4} for="ecole">Enfants :</Label>
                                            <Label size='lg' sm={4} for="ecole">{ntoC(mui)} (s'il y a):</Label> 
                                            <Col>
                                                <Input sm={8} bsSize="lg"
                                                        type="text"
                                                        name={"ecolemm" + mui}
                                                        id={"ecolemm" + mui}
                                                        value={enfant as string}
                                                        onChange={(e : any) => onEnfantsChange(mui, e.target.value)} 
                                                />
                                            </Col>
                                        </FormGroup>
                                )
                            })
                        }


                        <div  className="row">
                            <Button size="lg" 
                                className="col-12"
                                onClick={sendData} color="primary">Enregistrer.</Button>
                        </div>
                        <div className="row fixed-bottom w-50 m-auto align-center">
                            <hr className="row col-12 bg-secondary" />
                            <div className="row">
                                <Label className="col-12 text-secondary text-center">
                                    Lire attentivement <a onClick={() => setRoute("terms")}>notice d'utilisation.</a>
                                </Label>
                            </div>
                        </div>
                </Form>

               
            </div>
            {/* <div className="childPers w-100 p-0">
                <div className='float-right bg-secondary m-3 p-1 rounded'>
                    <h3 className=''>🕶️ Apercu rapide</h3>
                </div>
                <hr />
                <div className="container w-100 min-vh-100">
                    <div className='row w-100' style={{minHeight: '10rem'}}>
                        <img className='col' src={avatar} width='max-content' height='auto' alt='' />   
                        <h4 className='col m-auto'>Mr Joe Something</h4>
                    </div>
                    <div className="row my-1 w-100 border-bottom border-light" style={{minHeight: '10rem'}}>
                        <h4 className='col'>Grade et nom :</h4>
                        <h5 className='col'>Mr something</h5>
                    </div>
                    <div className="row w-100 align-items-end" style={{minHeight: '10rem'}}>
                        <span className='col'></span>
                        <button type='button' className='col btn btn-outline-warning'>Naviguer au profil.</button>
                    </div>
                </div>
            </div> */}
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Person);