import { useHistory, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import { connect } from "react-redux";
import { IState } from "../store/core/core";
import { setRoute, eraseRoute } from "../store/Actions/actionCreator";
import sessionReducer from "../store/reducers/sessionReducer";
import rootReducer from "../store/reducers/mainReducer";
import history from './historyNavigator';

const mapStateToProps = (state) => {
  return { route: state.sessionReducer.routing };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gotoRoute: (where: string) => dispatch(setRoute(where)),
    eraseRoute: () => dispatch(eraseRoute()),
  };
};

const HistoryNavigator = ({ route, eraseRoute }) => {
  useEffect(() => {
    
    const goto = () => {
      console.log("######### RECEIVED " + route);
      // const p = '/' + route;
      eraseRoute();
      history.push('/' + route);
    };

    if (route !== "") {
      goto();
    }
  }, [eraseRoute, route]);


  return <></>;
};

// const history = Array<string>();

export default connect(mapStateToProps, mapDispatchToProps)(HistoryNavigator);
