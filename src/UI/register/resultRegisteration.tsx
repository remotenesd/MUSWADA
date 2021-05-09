import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import {useDispatch} from 'react-redux';
import { programNav } from '../store/store';


const ResultRegisteration = (props, state) => {

    const dispatcher = useDispatch()
    
    programNav('/personnel');


    return (
        <div className={"d-flex w-100 h-100 align-items-center justify-content-center coverHome"}>
            <div className="flexboxupdown">
                <h1 className="flexitem display-1">
                    BATRAL DAOUD BEN AICHA
                </h1>
                <h2 className="flexitem"> ENREGISTREMENT EN COURS...</h2>
                <h2 className="flexitem">☑️ Attendez svp...</h2>
                <Spinner />
            </div>
        </div>
    )
};

export default ResultRegisteration;