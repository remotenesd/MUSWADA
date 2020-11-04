import React from 'react';

import './UI/styles/app.css';
import * as theming from './UI/theming/theming';

import NavMenuNoLogin from './UI/navs/navMenuNoLogin';
import Routing from './UI/Routes';
import { Redirect, Router, BrowserRouter } from 'react-router-dom';
import HistoryNavigator from './UI/helpers/historyNavigator';
import { ToastHeader } from 'reactstrap';


import * as mappers from './loginUtils';
import {connect } from 'react-redux';
import NavMenuWithLogin from './UI/navs/navMenuWithLogin';
import { newModifiedComponent } from './UI/helpers/routeStyler';

class App extends React.Component {

    state = {
        goto : '',
        activeTheme : '',
        switchToVerticalNav : false,
    }

    props =  {
        loggedIn : null,
        logout : null,
        route : '',
    }

    propsForMenu = {
        verticalToggle : () => {} ,
        redirecter : (s) => {} ,
        toggleTheme : () => {},
        gotoRoute : (r) => {},

    }

    stateForMenu = {
        route : '',
    }

    constructor(props)
    {
        super(props);
        this.goto.bind(this);

        this.propsForMenu.verticalToggle = () => this.switchNav.bind(this)();
        this.propsForMenu.redirecter = (path) => this.goto(path);
        this.propsForMenu.toggleTheme = () => this.applyTheme(this.state.activeTheme === 'dark' ? 'light' : 'dark' );
    }

    goto(path : String)
    {
        this.setState({goto : path});
    }

    applyTheme(theme)
    {
        if (theme === 'light')
        {
            theming.applyTheme(theming.lightTheme);
        }
        if (theme === 'dark')
        {   
            theming.applyTheme(theming.darkTheme)
        }
        this.setState({activeTheme : theme});
    }

    componentWillMount()
    {
        this.applyTheme('dark');
    }

    switchNav()
    {
        this.setState({ verticalToggle : !this.state.switchToVerticalNav });
    }

    render()
    {
        // 

        return (
                
                    <div className="content">
                        <div className="draggable">
                            {
                            this.props.loggedIn ? 
                                newModifiedComponent(
                                    {
                                        component : NavMenuWithLogin,
                                        useStyle : false,
                                        props :  this.propsForMenu,
                                        state : this.stateForMenu,
                                    }
                                )
                            :
                            newModifiedComponent(
                                {
                                    component : NavMenuNoLogin,
                                    useStyle : false,
                                    props :  this.propsForMenu,
                                    state : this.stateForMenu,
                                }
                            )
                            }
                            
                        </div>
                        <BrowserRouter>
                            <Routing />
                            <HistoryNavigator goto={
                                            this.state.goto
                                        } />        
                        </BrowserRouter>
                        
                    </div>
        )
    }
}

export default connect(mappers.mapStateToProps, mappers.mapDispatchToProps)(App);