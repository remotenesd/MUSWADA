/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component, CSSProperties, Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";

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
  DropdownMenu,
} from "reactstrap";

import { rerenderAPP } from '../../index' 

import "../styles/navMenu.css";

export const noWrap = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
} as React.CSSProperties;

const NavMenuNoLogin = ({
  toggleTheme,
  gotoRoute,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [route, setRoute] = useState('');
  let toggleNavbar;
  
  console.log('[ROUTING] UPDATING NAV.')
  useEffect(() => {
    // setCollapsed =  (v : boolean) => {this.collapsed = v }/
    toggleNavbar = () => {
      setCollapsed(!collapsed);
      // verticalToggle();
    };
  })

  useEffect( () => {
    toggleNavbar();
    gotoRoute(route);
  }, [route])
  
  console.log('[ROUTING] UPDATING NAV.2')
  useEffect(() => {

  }, [ gotoRoute, toggleTheme])

  // this.setState({ redirect : ''});
  // this.setState({ collapsed : true});

  // console.log(state);

  console.log('[ROUTING] UPDATING NAV.3')
  const menus: { [title: string]: string } = {
    "SIGN IN": "login",
    "Register" : "register",
    "ABOUT": "about",
  };
  
  console.log('[ROUTING] UPDATING NAV.4')
  const getMenus = () => {
    return (
      <Fragment>
        {Object.keys(menus).map((key) => {
          // iterate over menus and set up navs
          return (
            <NavItem key={key}>
              <NavLink
                key={key}
                className="darkTheme noDrag"
                style={{ ...noWrap }}
                onClick={() => setRoute(menus[key])}
              >
                {key}
              </NavLink>
            </NavItem>
          );
        })}
      </Fragment>
    );
  };

  console.log('[ROUTING] UPDATING NAV.5')
  return (
    <Navbar color="dark" light expand="md">
      <NavbarBrand className="darkTheme noDrag" onClick={() => rerenderAPP()}>
        Gestionnaire
      </NavbarBrand>
      <NavbarToggler className="noDrag" onClick={() => toggleNavbar()}></NavbarToggler>
      <Collapse className="" isOpen={!collapsed} navbar>
        <Nav className="mr-auto darkTheme" navbar>
          {getMenus()}
        </Nav>
        <UncontrolledDropdown className="noDrag" setActiveFromChild>
          <DropdownToggle tag="a" className="nav-link noLinkStyle" caret>
            Theme
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag="a" onClick={() => toggleTheme()} active>
              Switch Theme
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <NavbarText style={{ color: "grey", ...noWrap }}>
          @2020 UND SERVICES AND TECHNOLOGIES
        </NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default NavMenuNoLogin;
