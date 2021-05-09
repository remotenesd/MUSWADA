import React, { useEffect, useState } from 'react';
import { globals } from '../helpers/globals';
import { register, setLogin, setRoute, usernameExist } from '../store/Actions/actionCreator';
import '../styles/personnel.css';
import avatar from '../images/avatar-svgrepo-com.svg';

import {connect} from 'react-redux'
import { Button, Col, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

const mapStateToProps = (state ) => {
    return {
        usernameExist : state.sessionReducer.usernameExist,
        curStep : state.rgReducer.rg?.curStep,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        doesUsernameExist : (username) => dispatch(usernameExist(username)),
        register : (user) => dispatch({type : 'S1', data :  user}),
        setRoute : (route) => 
                            dispatch(setRoute(route)),
    }
}



const Person = (
    {
        usernameExist , curStep,
        doesUsernameExist , register , setRoute
    }
) => {

    const redStyle = {
        'color' : 'red'
    }    

    const [nom, setnom] = useState('');
    const [prenom, setprenom] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [matricule, setMatricule] = useState('');
    const [grade, setGrade] = useState('');
    const [fonction, setFonction] = useState('');
    const [promotion, setPromotion] = useState('');
    const [datenaissance, setDatenaissance] = useState('');
    const [villenaissance , setVillenaissance] = useState('');
    const [cni , setCni] = useState('');
    const [userNameTaken, setUserNameTaken] = useState(true);
    const [goto, setGoto] = useState('');

    useEffect(() => {
        if (curStep > 1)
        {
            setRoute('personStep' + curStep);
        }
    }, [curStep])

    const autofill_ = () => {
        setnom('updateRequired');
        setprenom('updateRequired');
        setEmail('updateR@equir.dwed');
        setTel('0679450019');
        setMatricule('opejwoij');
        setGrade('ev1');
        setPromotion('2012');
        setDatenaissance('2012');
        setVillenaissance('updateRequired');
        setCni('updateRequired');
    }
    
    const onIDChange = (e:any) =>
    {
        var v = String("");
        v = e.target.value;
        v = v.toUpperCase();
        
        var user = {
            name : v
        }     

        usernameExist = true;
        doesUsernameExist(v);
        
        setnom(v);
    }

    
    const onPASSChange = (e:any) =>
    {
        var v = String("");
        v = e.target.value;
        v = v.toUpperCase(); 
        
        setprenom(v);
    }

    function validatePass() :  {result : boolean, reason : string}
    {
        // check pass phrase 
        // 
        if (prenom.length < 3)
        {
            return {
                result : false,
                reason : 'Le prenom doit contenir trois characteres au moins.'
            };
        }

        var spaceRegex = /\s+/;
        if (spaceRegex.test(prenom.toString()))
        {
            return {
                result : false,
                reason : 'White space and tabulations are not allowed.'
            };
        }

        var passRegex = /^(?=.*\W)(?=.*\d)[a-zA-Z\d\W]{8,}$/;

        if (passRegex.test(prenom.toString()))
        {
            return {
                result : false,
                reason : 'Pas de characteres speciaux !'
            };
        }

        return {result : true, reason : ''};
    }

    function validateEmail() : {result : boolean , reason : string}
    {
        // check email
        var emailRegex = /^[a-zA-Z0-9]{3,}@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;
        if (! emailRegex.test(email.toString()))
        {
            return {
                result : false,
                reason : 'Invalid email. Valid format : SOMEONE@PLACE.COM'
            }
        }
        return {
            result : true,
            reason : ''
        };
    }

    function validateTel() : {result : boolean , reason : string}
    {
        var moreThanTwoRegex = /[\w\d]{2,}/;
        return {
            result : moreThanTwoRegex.test(tel),
            reason : ''
        };
    }

    function validateMatricule() : {result : boolean , reason : string}
    {
        var moreThanTwoRegex = /[\w\d]{2,}/;
        return {
            result : moreThanTwoRegex.test(matricule),
            reason : ''
        };
    }

    function validatePromotion() : {result : boolean , reason : string}
    {
        var moreThanTwoRegex = /[\w\d]{2,}/;
        return {
            result : moreThanTwoRegex.test(promotion),
            reason : ''
        };
    }

    function validateGrade() : {result : boolean , reason : string}
    {
        var moreThanTwoRegex = /[\w\d]{2,}/;
        return {
            result : moreThanTwoRegex.test(grade),
            reason : ''
        };
    }

    function validateFonction() : {result : boolean , reason : string}
    {
        var moreThanTwoRegex = /[\w\d]{2,}/;
        return {
            result : moreThanTwoRegex.test(fonction),
            reason : ''
        };
    }

    function validateDatenaissance() : {result : boolean , reason : string}
    {
        var moreThanTwoRegex = /[\w\d]{2,}/;
        return {
            result : moreThanTwoRegex.test(datenaissance),
            reason : ''
        };
    }

    function validateVillenaissance() : {result : boolean , reason : string}
    {
        var moreThanTwoRegex = /[\w\d]{2,}/;
        return {
            result : moreThanTwoRegex.test(villenaissance),
            reason : ''
        };
    }

    function validateCni() : {result : boolean , reason : string}
    {
        var moreThanTwoRegex = /[\w\d]{2,}/;
        return {
            result : moreThanTwoRegex.test(cni),
            reason : ''
        };
    }

    const onEmailChange = (e:any) =>
    {
        var v = String("");
        v = e.target.value;
        setEmail(v);
    }

    const onTelChange = (e:any) =>
    {
        var v = String("");
        v = e.target.value;
        setTel(v);
    }

    const onMatriculeChange = (e:any) =>
    {
        var v = String("");
        v = e.target.value;
        setMatricule(v);
    }

    const onGradeChange = (e:any) =>
    {
        var v = String("");
        v = e.target.value;
        setGrade(v);
    }

    const onFonctionChange = (e:any) =>
    {
        var v = String("");
        v = e.target.value;
        setFonction(v);
    }

    const onPromotionChange = (e:any) =>
    {
        var v = String("");
        v = e.target.value;
        setPromotion(v);
    }

    const onCniChange = (e:any) =>
    {
        var v = String("");
        v = e.target.value;
        setCni(v);
    }

    const onDatenaissanceChange = (e:any) =>
    {
        var v = String("");
        v = e.target.value;
        setDatenaissance(v);
    }

    const onVilleChange = (e:any) =>
    {
        var v = String("");
        v = e.target.value;
        setVillenaissance(v);
    }

    const sendData = () =>
    {
        // some checks TODO

        const user = {
            nom : nom,
            prenom : prenom,
            email : email,
            
            grade : grade,
            cni : cni,
            fonction : fonction,
            promotion : promotion,
            villenaissance : villenaissance,
            datenaissance : datenaissance,
            tel : tel,
            matricule : matricule,
        }

        register(user);
    }


    return (
        <div className="d-flex w-100 h-100 personCover px-5 py-2" style={{color: "#012121"}}>
            <div className="maindPers align-items-center justify-content-center overflow-scroll" style={{paddingTop: '20px'}}>
                <h1 onClick={() => autofill_()}> 
                    Ajout d'une personne : Informations de base
                </h1>
                <h3>
                    Commencer par saisir les champs suivants:
                </h3>
                <Form className=' my-2 py-1 ' style={{height: '70vh', overflowX: 'hidden', overflowY: 'scroll', marginBottom: '50px'}}>
                        <FormGroup row>
                            <Label size="lg" xs={12} sm={12} for="ide"><b>Nom </b></Label>
                            <Col>
                                <Input xs={12} sm={12} bsSize="lg"  
                                    type="text" 
                                    name="ide" 
                                    id="ide" 
                                    placeholder="ID" 
                                    value={nom.toString()}
                                    onChange={(e:any) => onIDChange(e)}
                                />
                            </Col>
                            {
                                usernameExist === true && nom.length > 2 ? 
                                <Label style={redStyle} size="lg" xs={12} sm={12} for="ide"><b>Ce nom existe deja !</b></Label>
                                :
                                null
                            }
                        </FormGroup>
                        <FormGroup row hidden={nom.length < 3 || usernameExist}>
                            <Label size="lg" sm={12} for="prenom">Prenom :</Label>
                            <Col>
                                <Input sm={8} bsSize="lg"  
                                    type="text" 
                                    name="prenom" 
                                    id="prenom" 
                                    placeholder="" 
                                    value={prenom.toString()}
                                    onChange={(e:any) => onPASSChange(e)}
                                />
                            </Col>
                            <Label style={redStyle} size="lg" sm={12} for="">{validatePass()['reason']}</Label>
                        </FormGroup>

                        <FormGroup row hidden={!validatePass()['result']}>
                            <Label size="lg" sm={4} for="email">Email</Label>
                            <Col>
                                <Input sm={8} bsSize="lg"
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="@E"
                                    value={email.toString()}
                                    onChange={(e : any) => onEmailChange(e)}
                                />

                            </Col>
                            <Label style={redStyle} size="lg" sm={12} for="">{validateEmail()['reason']}</Label>
                        </FormGroup>

                        <FormGroup row hidden={!validateEmail()['result']}>
                            <Label size="lg" sm={4} for="email">Numero de Tel</Label>
                            <Col>
                                <Input sm={8} bsSize="lg"
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    placeholder="06-66-66-66"
                                    value={tel.toString()}
                                    onChange={(e : any) => onTelChange(e)}
                                />

                            </Col>
                            <Label style={redStyle} size="lg" sm={12} for="">{validateTel()['reason']}</Label>
                        </FormGroup>


                        <FormGroup row hidden={!validateTel()['result']}>
                            <Label size="lg" sm={4} for="email">Identifiant CNI</Label>
                            <Col>
                                <Input sm={8} bsSize="lg"
                                    type="text"
                                    name="cni"
                                    id="cni"
                                    placeholder="AA123456"
                                    value={cni.toString()}
                                    onChange={(e : any) => onCniChange(e)}
                                />

                            </Col>
                            <Label style={redStyle} size="lg" sm={12} for="">{validateCni()['reason']}</Label>
                        </FormGroup>
                        
                        <FormGroup row hidden={!validateCni()['result']}>
                            <Label size="lg" sm={4} for="email">Grade actuel</Label>
                            <Col>
                                <Input sm={8} bsSize="lg"
                                    type="text"
                                    name="grade"
                                    id="grade"
                                    placeholder="SM2"
                                    value={grade.toString()}
                                    onChange={(e : any) => onGradeChange(e)}
                                />

                            </Col>
                            <Label style={redStyle} size="lg" sm={12} for="">{validateGrade()['reason']}</Label>
                        </FormGroup>


                        <FormGroup row hidden={!validateGrade()['result']}>
                            <Label size="lg" sm={4} for="email">Promotion</Label>
                            <Col>
                                <Input sm={8} bsSize="lg"
                                    type="text"
                                    name="cni"
                                    id="cni"
                                    placeholder="AA123456"
                                    value={promotion.toString()}
                                    onChange={(e : any) => onPromotionChange(e)}
                                />

                            </Col>
                            <Label style={redStyle} size="lg" sm={12} for="">{validatePromotion()['reason']}</Label>
                        </FormGroup>

                        <FormGroup row hidden={!validatePromotion()['result']}>
                            <Label size="lg" sm={4} for="email">Matricule</Label>
                            <Col>
                                <Input sm={8} bsSize="lg"
                                    type="text"
                                    name="matricule"
                                    id="matricule"
                                    placeholder="123-123"
                                    value={matricule.toString()}
                                    onChange={(e : any) => onMatriculeChange(e)}
                                />

                            </Col>
                            <Label style={redStyle} size="lg" sm={12} for="">{validateMatricule()['reason']}</Label>
                        </FormGroup>

                        <FormGroup row hidden={!validateMatricule()['result']}>
                            <Label size="lg" sm={4} for="email">Fonction</Label>
                            <Col>
                                <Input sm={8} bsSize="lg"
                                    type="text"
                                    name="fonction"
                                    id="fonction"
                                    placeholder="Détecteur"
                                    value={fonction.toString()}
                                    onChange={(e : any) => onFonctionChange(e)}
                                />

                            </Col>
                            <Label style={redStyle} size="lg" sm={12} for="">{validateMatricule()['reason']}</Label>
                        </FormGroup>

                        <FormGroup row hidden={!validateFonction()['result']}>
                            <Label size="lg" sm={4} for="email">Ville de Naissance</Label>
                            <Col>
                                <Input sm={8} bsSize="lg"
                                    type="text"
                                    name="ville"
                                    id="ville"
                                    placeholder="CASABLANCA"
                                    value={villenaissance.toString()}
                                    onChange={(e : any) => onVilleChange(e)}
                                />

                            </Col>
                            <Label style={redStyle} size="lg" sm={12} for="">{validateVillenaissance()['reason']}</Label>
                        </FormGroup>

                        <FormGroup row hidden={!validateVillenaissance()['result']}>
                            <Label size="lg" sm={4} for="email">Date de naissance :</Label>
                            <Col>
                                <Input sm={8} bsSize="lg"
                                    type="text"
                                    name="date"
                                    id="date"
                                    placeholder="11/11/1970"
                                    value={datenaissance.toString()}
                                    onChange={(e : any) => onDatenaissanceChange(e)}
                                />

                            </Col>
                            <Label style={redStyle} size="lg" sm={12} for="">{validateDatenaissance()['reason']}</Label>
                        </FormGroup>

                        
                        <div  className="row">
                            <Button size="lg" 
                                className="col-12"
                                onClick={sendData} hidden={!!validateDatenaissance()['reason']} color="primary">Enregistrer.</Button>
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