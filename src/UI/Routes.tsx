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
// import MainBlockchain from "./blockchain/main";
import Todo from "./todo/Todo";
import Profile from "./profile";
import Chat from "./chat";
import Personnel from "./personnel";
import Person from "./register/person";
import outils from "./outils";
import service from "./service/service";
import configurer from "./service/configurer";
import bordees from "./service/bordees";
import permissionnaires from "./permissionnaires";
import personStep2 from "./register/personStep2";
import error_ from "./error_";
import filler from "./register/filler";
import ResultRegisteration from "./register/resultRegisteration";
import sedeplacer from "./sedeplacer";
import listedeplacer from "./listedeplacer";
import regpermission from "./regpermission";
import listepermission from "./listepermission";
import detailsPermission from "./detailsPermission";
import listepermissionde from "./listepermissionde";
import RegisterInitial from './registerInitial';
import registerInitial from "./registerInitial";
import options from "./options";
import About from "./about";
import priseArmes from "./priseArmes";
import priseArmesPourJournee from "./priseArmesPourJournee";
import priseArmesPourJourneeDisplay from "./priseArmesPourJourneeDisplay";

const Routing = (props, state) => (
  <Fragment>
    <Route
      exact
      path="/"
      render={(props) =>
        newModifiedComponent({ component: Home, useStyle: false, props })
      }
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
  
    
    
    {/* <PrivateRoute
      exact
      path="/Personnel"
      render={(props) =>
        newModifiedComponent({ component: Personnel, useStyle: false, props })
      }
    /> */}
    <PrivateRoute useStyle={false} path="/Personnel" component={Personnel} />
    <Route
      exact
      path="/Deplacer"
      render={(props) =>
        newModifiedComponent({ component: sedeplacer, useStyle: false, props })
      }
    />
    <Route
      exact
      path="/regpermission"
      render={(props) =>
        newModifiedComponent({ component: regpermission, useStyle: false, props })
      }
    />
    <Route
      exact
      path="/Listpermission"
      render={(props) =>
        newModifiedComponent({ component: listepermission, useStyle: false, props })
      }
    />
    <Route
      exact
      path="/ListpermissionDe"
      render={(props) =>
        newModifiedComponent({ component: listepermissionde, useStyle: false, props })
      }
    />
    <Route
      exact
      path="/DetailsPermission"
      render={(props) =>
        newModifiedComponent({ component: detailsPermission, useStyle: false, props })
      }
    />
    <Route
      exact
      path="/Listdeplacer"
      render={(props) =>
        newModifiedComponent({ component: listedeplacer, useStyle: false, props })
      }
    />
    <Route
      exact
      path="/vivres"
      render={(props) =>
        newModifiedComponent({ component: permissionnaires, useStyle: false, props })
      }
    />
    <Route
      exact
      path="/Permissionnaires"
      render={(props) =>
        newModifiedComponent({ component: listepermission, useStyle: false, props })
      }
    />
    <Route
      exact
      path="/outils"
      render={(props) =>
        newModifiedComponent({ component: outils, useStyle: false, props })
      }
    />

    <Route
      exact
      path="/Service"
      render={(props) =>
        newModifiedComponent({ component: service, useStyle: false, props })
      }
    />
    <Route
      exact
      path="/Configurerservice"
      render={(props) =>
        newModifiedComponent({ component: configurer, useStyle: false, props })
      }
    />
    <Route
      exact
      path="/Bordees"
      render={(props) =>
        newModifiedComponent({ component: bordees, useStyle: false, props })
      }
    />
    <Route
      exact
      path="/prisearmes"
      render={(props) =>
        newModifiedComponent({ component: priseArmesPourJournee, useStyle: false, props })
      }
    />

    <Route
      exact
      path="/etablirPriseArmes"
      render={(props) =>
        newModifiedComponent({ component: priseArmes, useStyle: false, props })
      }
    />

    <Route
      exact
      path="/priseArmeJourneeDisplay"
      render={(props) =>
        newModifiedComponent({ component: priseArmesPourJourneeDisplay, useStyle: false, props })
      }
    />




    <Route
      exact
      path="/Person"
      render={(props) =>
        newModifiedComponent({ component: Person, useStyle: false, props })
      }
    />

    <Route
      exact
      path="/PersonStep2"
      render={(props) =>
        newModifiedComponent({ component: personStep2, useStyle: false, props })
      }
    />
    <Route
      exact
      path="/S3"
      render={(props) =>
        newModifiedComponent({ component: filler, useStyle: false, props })
      }
    />
    <Route
      exact
      path="/resultRegisteration"
      render={(props) =>
        newModifiedComponent({ component: ResultRegisteration, useStyle: false, props })
      }
    />
    <Route
      exact
      path="/serverError"
      render={(props) =>
        newModifiedComponent({ component: error_, useStyle: false, props })
      }
    />

    {/* <Route  path="/account" render={(props) =>  routeStyler({component : Account, props} )} /> */}
    <PrivateRoute useStyle={false} path="/account" component={Account} />
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
    
    <Route
      exact
      path="/RegisterInitial"
      render={(props) =>
        newModifiedComponent({ component: registerInitial, useStyle: false, props })
      }
    />
    
    <Route
      exact
      path="/options"
      render={(props) =>
        newModifiedComponent({ component: options, useStyle: false, props })
      }
    />

  <Route
      exact
      path="/about"
      render={(props) =>
        newModifiedComponent({ component: About, useStyle: false, props })
      }
    />



    {
      /*
        ROUTING ENABLED (HISTORY NAVIGATOR)
      */
    }

    {/* <Route
      exact
      path="/blockchain"
      render={(props) =>
        newModifiedComponent({ component: MainBlockchain, useStyle: true, props })
      }
    /> */}

    <Route
      exact
      path="/profile"
      render={(props) =>
        newModifiedComponent({ component: Profile, useStyle: false, props })
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
