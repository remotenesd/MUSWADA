import React, { useEffect, useState } from 'react';
import { globals } from '../helpers/globals';
import { register, setLogin, setRoute, usernameExist } from '../store/Actions/actionCreator';
import '../styles/personnel.css';
import avatar from '../images/avatar-svgrepo-com.svg';

import {connect} from 'react-redux'
import { Button, Col, Form, FormGroup, 
    Input, Label, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';
// import { Select } from '@blueprintjs/select';


let ntoC = (num : number) => {
    let nums = ["premier" , "deuscieme", "troisieme", "quatrieme", "cinquieme", "sixieme"]
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
        rg : state.rgReducer.rg,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        register : (user) => dispatch({type : 'S2', data :  user}),
        setRoute : (route) => 
                            dispatch(setRoute(route)),
    }
}

const Filler  = (
                    {
                        curStep, registered, rg,
                        doesUsernameExist , register , setRoute
                    }
            ) => {

    const redStyle = {
        'color' : '#12a7a7',
        'background-color' : '#f1f9f9',
        'opacity' : '0.9',
        'font-size' : '1.6em'
    }    

    const [rm, setRM] = useState('');
    const [validated, setValidated] = useState(false);


    const [myMap, setMyMap] = useState(new Map<string, any>());
    const [name, setName] = useState('e');
    const [error_, setError] = useState('Ol');

    let data;
    data = rg.dataToReq();
    console.log(data);
    if (data === undefined || data === null || data.data === undefined || data.data === null || data.data === [])
    {
        data = [];
        setRoute('/resultregisteration');
        return <Spinner />
    }
    data.data.forEach(item => myMap.set(item.name, item.getValue()));

    let redefineMap = data.data.map(
            item =>
                 {

                    if (item === null || item === undefined || item === '')
                    {
                        return <Spinner />
                    }
                     console.log(item.type);
                    if ( item.type === 'string') 
                    {
                        return (
                            <FormGroup row>
                                <Label size="lg" sm={4} style={{textAlign: 'end'}} for={item.name}>{item.label}</Label>
                                <Col>
                                    <Input sm={8} 
                                        bsSize="lg"
                                        type="text"
                                        disabled={item.disabled}
                                        key={item.name}
                                        name={item.name}
                                        id={item.name}
                                        placeholder={item.placeholder}
                                        value={myMap.get(item.name)}
                                        onChange={(e : any) => {
                                                item.onChange(e.target.value); 
                                                // setMyMap(myMap.set(item.name, item.getValue()));
                                                setMyMap(myMap.set(item.name, e.target.value));
                                                setName(e.target.value);
                                                // console.log(myMap.set(item.name, e.target.value));
                                            }
                                        }
                                    />
            
                                </Col>
                                {/* <Label style={redStyle} size="lg" sm={12} for="">{validateGrade()['reason']}</Label> */}
                            </FormGroup>
                        );
                    }  

                    if (item.type === 'select')
                    {
                        return (
                        <FormGroup row>
                            <Label size="lg" sm={4} style={{textAlign: 'end'}} for={item.name}>{item.label}</Label>
                            <Col sm={8}>
                                {/* <item.customSelect
                                    items={item.options}
                                    initialContent={[]}
                                    noResults={<h1>No results.</h1>}
                                    onItemSelect={() => {}}
                                >
                                     
                                </item.customSelect>  */}
                                
                                <Input type='select'  name="select" id={item.id} disabled={item.disabled}>
                                    {
                                        item.options.map(option => (
                                            <option onSelect={() => item.onChange(item.title)} value={option.title}>{option.title}</option>
                                        ))
                                    }
                                </Input>
                              
                            </Col>
                            {/* <Label style={redStyle} size="lg" sm={12} for="">{validateGrade()['reason']}</Label> */}
                        </FormGroup>
                        );
                    }
                    
                  
                }
            
    ); 

    

    // let useNewSigState = (id, name, value) => {
    //     let stt = useState(value);
    //     return {
    //         id : id,
    //         name : name,
    //         state : stt[0],
    //         setState : stt[1],
    //     }
    // }

    console.log('update !');
    // if (data === undefined){return <Spinner />}

    let useMapToHTML = redefineMap;

    // console.log(mapToHTML())
    // console.log(data);
    // mapToHTML = redefineMap(data);

    return (
        <div className="d-flex w-100 h-100 personCover px-5 py-2" style={{color: "#012121"}}>
            <div className="maindPers align-items-center justify-content-center" style={{paddingTop: '20px'}}>
                <h1>
                    {data.meta.title}
                </h1>
                <h3>
                    {data.meta.description} 
                </h3>
        	    
                <br />  
                <Form className=' my-2 py-1 ' style={{height: '70vh', overflowX: 'hidden', marginBottom: '50px'}}>
                        <h3> * Informations de base : </h3>
                        {redefineMap}
                        {
                            data.validated ?
                            (
                                <Spinner />
                            ) :
                            (<></>
                            )
                        }
                        <p style={redStyle}>{error_} </p> 
                        <div  className="row">
                                    <Button size="lg" 
                                        className="col-12"
                                        onClick={() => {
                                            let d = data.register(); 
                                            if (d && d !== undefined && d !== null)
                                            {

                                                setValidated(d.validated);
                                                setError(d.remarks);
                                                // console.log(data);
                                            }
                                         }
                                        }
                                        color="primary">
                                            Continuer ➡️
                                        </Button>
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
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Filler);