// import { useHistory, Redirect } from "react-router-dom";
// import { useState, useEffect } from "react";
// import React from "react";
// import { connect } from "react-redux";
// import { IState } from "../store/core/core";
// import { setRoute, eraseRoute } from "../store/Actions/actionCreator";
// import sessionReducer from "../store/reducers/sessionReducer";
// import rootReducer from "../store/reducers/mainReducer";

// const mapStateToProps = (state) => {
//   return { route: state.sessionReducer.routing };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     gotoRoute: (where: string) => dispatch(setRoute(where)),
//     eraseRoute: () => dispatch(eraseRoute()),
//   };
// };

// const HistoryNavigator = ({ route, gotoRoute, eraseRoute }) => {
//   const history = useHistory();

//   useEffect(() => {
    
//     const goto = () => {
//       console.log("######### RECEIVED " + route);
//       // const p = '/' + route;
//       eraseRoute();
//       history.push(route);
//       return;
//       return <Redirect to={route} />; // we need to redirect without return //todo

//     };

//     if (route !== "") {
//       goto();
//     }
//   }, [eraseRoute, route]);

//   // setUrl(newUrl : String)
//   // {
//   //     history.push(newUrl.toString());
//   //     this.setState({urls : newUrl});
//   // }


//   // if (route !== "") {
//   //   const p = "/" + route;
//   //   eraseRoute();
//   //   return <Redirect to={route} />;
//   // } else {
    
//   // }

//   return <></>;
// };

// // const history = Array<string>();

// export default connect(mapStateToProps, mapDispatchToProps)(HistoryNavigator);

// src/history.js

import {  createHashHistory } from 'history';

export default createHashHistory();