import React, { Fragment } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "./login";
import Account from "./account";
import Home from "./home";
import { routeStyler, newModifiedComponent } from "./helpers/routeStyler";
import PrivateRoute from "./helpers/privateRoute";
import Register from "./register";
import Terms from "./terms";
import Signout from "./signout";
import RegisterSuccess from "./navs/registerSuccess";
import Signature from "./docs/signature";
import Docs from "./docs/docs";
import Asymetric from "./docs/asymtric";
import MainBlockchain from "./blockchain/main";
import Todo from "./todo/Todo";
import Profile from "./profile";
import Chat from "./chat";

const Routing = (props, state) => (
  <Fragment>
    <Route
      exact
      path="/"
      render={(props) => routeStyler({ component: Home, props })}
    />
    <Route
      exact
      path="/terms"
      render={(props) => routeStyler({ component: Terms, props })}
    />
    <Route exact path="/login" component={Login} />
    {/* <Route  path="/login" render={(props) =>  routeStyler({component : Login, props} )} /> */}
    <Route
      path="/signout"
      render={(props) => routeStyler({ component: Signout, props })}
    />
    {/* <Route path="/todo" component={TODO} /> */}
    <Route
      exact
      path="/register"
      render={(props) => routeStyler({ component: Register, props })}
    />
    <Route
      exact
      path="/registerSuccess"
      render={(props) => routeStyler({ component: RegisterSuccess, props })}
    />
    {/* <Route  path="/account" render={(props) =>  routeStyler({component : Account, props} )} /> */}
    <PrivateRoute path="/account" component={Account} />
    <Route
      exact
      path="/docs/digitalsignatures"
      render={(props) => routeStyler({ component: Signature, props })}
    />
    <Route
      exact
      path="/docs/asymetric"
      render={(props) => routeStyler({ component: Asymetric, props })}
    />
    <Route
      exact
      path="/docs"
      render={(props) =>
        newModifiedComponent({ component: Docs, useStyle: true, props })
      }
    />
    
    <Route
      exact
      path="/todos"
      render={(props) =>
        newModifiedComponent({ component: Todo, useStyle: false, props })
      }
    />



    {
      /*
        ROUTING ENABLED (HISTORY NAVIGATOR)
      */
    }

    <Route
      exact
      path="/blockchain"
      render={(props) =>
        newModifiedComponent({ component: MainBlockchain, useStyle: true, props })
      }
    />
    <Route
      exact
      path="/profile"
      render={(props) =>
        newModifiedComponent({ component: Profile, useStyle: true, props })
      }
    />
    <Route
      exact
      path="/chat"
      render={(props) =>
        newModifiedComponent({ component: Chat, useStyle: true, props })
      }
    />
    {/* <PrivateRoute path="/admin" component={Admin} />
        <PrivateRoute path="/add" component={AddItem}  />
        <PrivateRoute path="/search" component={Search}  />
        <PrivateRoute path="/addedSuccess" component={AddedSuccess}  />
        <RestrictedRoute restricted={true} path="/register" component={Register}  /> */}
  </Fragment>
);

export default Routing;
