/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';

import {newModifiedComponent, routeStyler} from './routeStyler';
import { RootState } from '../store/store';

class NoLogin extends React.Component
{
    render()
    {
        return (<>
                    <h1>No login !</h1>
                    <h4>Please Sign in in order to access this page.</h4>  
                </>  
        );
    }
} 



function PrivateRoute({component : Component  , useStyle : boolean, ...rest})
{
    const isloggedIn = useSelector((state : RootState)  => state.sessionReducer.user.isLoggedIn);
    return (
        
             <Route {...rest} render={  
                        (props) => (
                            
                                    isloggedIn ? 
                                    newModifiedComponent({ component: Component, useStyle: false, props })
                                    : 
                                    newModifiedComponent({ component: NoLogin, useStyle: false, props })
                                    
                        )
                    }
             />
            
    );
}

export default PrivateRoute;
