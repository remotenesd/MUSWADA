import React, {Component, CSSProperties, Fragment, useState} from 'react';
import ReactDOM from 'react-dom';


import 'bootstrap/dist/css/bootstrap.min.css';

import { 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu
} from 'reactstrap';

import { rerenderAPP } from '../../index' 
import '../styles/navMenu.css';


import logo from '../logo.svg';


export const noWrap =  {
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
    whiteSpace : "nowrap" ,
} as React.CSSProperties

const NavMenuWithLogin  = ({   route, verticalToggle , redirecter, toggleTheme, gotoRoute }) => {

    const [collapsed, setCollapsed] = useState(false);    
    // setCollapsed =  (v : boolean) => {this.collapsed = v }/

    const toggleNavbar = () => {
        setCollapsed(  ! collapsed  );
        // verticalToggle();
    }


    // this.setState({ redirect : ''});
    // this.setState({ collapsed : true});

    // console.log(state);

    const menus : {[title : string] : string} = {
        'ACCOUNT' : '/account',
        'BLOCKCHAIN' : '/blockchain',
        'TODO' : '/todos',
        'DOCS' : '/docs',
        'SIGNOUT' : '/signout'
    }
    
    let getMenus = () =>
    {
        return (
                <Fragment>
                    {
                        Object.keys(menus).map(key =>
                        {
                            // iterate over menus and set up navs
                            return (
                                <NavItem>
                                    <NavLink className="darkTheme noDrag" style={{  ...noWrap }} onClick={() => {
                                                            toggleNavbar();
                                                            gotoRoute(menus[key]);
                                                        }}>{key}</NavLink>
                                </NavItem>
                            )
                        })
                    }
                </Fragment>

        );
       
    }


    return (

            
            <Navbar  color="dark" light expand="md">
                    <NavbarBrand className="darkTheme noDrag" onClick = {() => rerenderAPP()}><img width={160} height={64} src={logo} /></NavbarBrand>
                    <NavbarToggler className="noDrag" onClick={toggleNavbar}></NavbarToggler>
                    <Collapse className="" isOpen={!collapsed}  navbar>
                        <Nav className="mr-auto darkTheme"  navbar>  
                            {
                                getMenus()
                            }
                        </Nav>
                        <UncontrolledDropdown className="noDrag" setActiveFromChild>
                            <DropdownToggle tag="a" className="nav-link noLinkStyle" caret>
                                Theme
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem tag="a" onClick={() => toggleTheme()} active>Switch Theme</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <NavbarText  style={{ color: 'grey', ...noWrap }} >@2020 UND SERVICES AND TECHNOLOGIES</NavbarText>
                    </Collapse>
            </Navbar>
        );
}

export default NavMenuWithLogin;