import React, { useState } from 'react';

import './UI/styles/app.css';
import * as theming from './UI/theming/theming';

import NavMenuNoLogin from './UI/navs/navMenuNoLogin';
import Routing from './UI/Routes';
import {  Router } from 'react-router-dom';

import * as mappers from './loginUtils';
import {connect } from 'react-redux';
import NavMenuWithLogin from './UI/navs/navMenuWithLogin';
import { newModifiedComponent } from './UI/helpers/routeStyler';
// import App from './App';

import history from './UI/helpers/historyNavigator';
import HistoryAction from './UI/helpers/historyAction';
import RegisterInitial from './UI/registerInitial';


interface state {
    goto : string,
    activeTheme : boolean,
    switchToVerticalNav : boolean,
}

interface props  {
    loggedIn : object,
    logout : object,
    route : string,
    firstUsage : boolean,
}


const App = (props : props) => {
 
    console.log("[AUTH1] " + props.loggedIn)

    // let [goto, setGotoFunc] = useState('');
    let [activeTheme, setActiveTheme] = useState('');
    let [switchToVerticalNav, setSwitchToVerticalNav] = useState(false);
    let [goto, setGoto] = useState('');
    // let [firstUsage, setFirstUsage] = useState(false);
    // let [firstUsageShunt, setFirstUsageShunt] = useState(false);
    // let [goto, setGoto] = useState('');
    // let [goto, setGoto] = useState('');

    // globalsChangedEvents.push(() => {
    //     console.log("[APP] first usage detection...")
    //     if (globals.appData.firstUsage)
    //     {
    //         setFirstUsage(true)
    //     }
    //     if (globals.firstDataSent)
    //     {
    //         setFirstUsageShunt(true);
    //     }
    //     console.log(globals.firstDataSent)
    // })

    let propsForMenu = {
        verticalToggle : () => {} ,
        redirecter : (s) => {} ,
        toggleTheme : () => {},
        gotoRoute : (r) => {},

    }


    let stateForMenu = {
        route : '',
    }

    // constructor()
    // {
        
    //     this.goto.bind(this);

    //     this.propsForMenu.verticalToggle = () => this.switchNav.bind(this)();
    //     this.propsForMenu.redirecter = (path) => this.goto(path);
    //     this.propsForMenu.toggleTheme = () => this.applyTheme(this.state.activeTheme === 'dark' ? 'light' : 'dark' );
    // }

    function applyTheme(theme)
    {
        if (theme === 'light')
        {
            theming.applyTheme(theming.lightTheme);
        }
        if (theme === 'dark')
        {   
            theming.applyTheme(theming.darkTheme)
        }
        activeTheme = theme;
    }

    propsForMenu.verticalToggle = () => switchNav.bind(this)();
    propsForMenu.redirecter = (path) => setGoto(path);
    propsForMenu.toggleTheme = () => applyTheme(activeTheme === 'dark' ? 'light' : 'dark' );

    applyTheme('dark');

    function switchNav()
    {
        setSwitchToVerticalNav(!switchToVerticalNav)
    }


    return (
                    <div className="content">
                        {
                        
                        props.firstUsage ?
                            <>
                                <RegisterInitial />
                            </>
                        :
                        <>
                            <div className="draggable">
                                {
                                props.loggedIn ? 
                                    newModifiedComponent(
                                        {
                                            component : NavMenuWithLogin,
                                            useStyle : false,
                                            props :  propsForMenu,
                                            state : stateForMenu,
                                        }
                                    )
                                :
                                newModifiedComponent(
                                    {
                                        component : NavMenuNoLogin,
                                        useStyle : false,
                                        props :  propsForMenu,
                                        state : stateForMenu,
                                    }
                                )
                                }
                                
                            </div>
                            <Router history={history}>
                                <Routing />
                                {/* <HistoryNavigator goto={
                                                goto
                                            } />         */}
                                <HistoryAction />
                            </Router>
                        </>
                        }
                        

                    </div>
        )
}


export default connect(mappers.mapStateToProps, mappers.mapDispatchToProps)(App);