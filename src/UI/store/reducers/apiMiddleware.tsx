import type { user } from "../core/core";
import * as ActionTypes from "../Actions/actionTypes";
import * as Actions from "../Actions/actionCreator";
import session from "../../storage/localStorage";
import Axios, { AxiosResponse } from "axios";
import {globals}from "../../helpers/globals";
import CryptoJS from "crypto-js";

function APIMiddleware({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      // console.log(action);
      if (action.type === ActionTypes.LOGOUT) {
        // request logout from backend
        const HEADERS = {
          "Content-Type": "application/json",
        };

        Axios.post(globals.baseURL + "/" + globals.userURL + "/logout").then(
          function (res: AxiosResponse) {
            // console.log(res.data);
            action.succes = true;

            // redirect to register successful page
            const nextAction = next(action);
            //read next state
            const state = getState();
            // return the next action
            return nextAction;
          }
        );
      } else if (action.type === ActionTypes.REGISTER) {
        // REGISTER THE USER

        const HEADERS = {
          "Content-Type": "application/json",
        };

        //!important
        action.payload.user.password = CryptoJS.SHA256(
          action.payload.user.password
        ).toString(CryptoJS.enc.Hex);

        Axios.post(
          globals.baseURL + "/" + globals.userURL + "/register",
          action.payload.user
        ).then((res) => {
          console.log(res.status);
          if (res.status == 200) {
            action.success = true;
          } else {
            action.success = false;
          }
          // redirect to register successful page
          const nextAction = next(action);
          //read next state
          const state = getState();
          // return the next action
          return nextAction;
        });
      } else if (action.type === ActionTypes.USERNAME_EXIST) {
        // does this username exist on the database
        const HEADERS = {
          "Content-Type": "application/json",
        };

        Axios.post(
          globals.baseURL + "/" + globals.userURL + "/isUsernameTaken",
          { username: action.payload.username }
        ).then((res) => {
          // console.log('new -=>p[ewkpke[w>>')
          if (res.status == 200) {
            // redirect to register successfull page
            action.success = true;
            action.data = {
              exist: res.data.exist,
            };
          } else {
            action.success = false;
            action.data = {
              exist: true,
            };
          }

          const nextAction = next(action);
          //read next state
          const state = getState();
          // return the next action
          return nextAction;
        });
      } else if (action.type === ActionTypes.SET_LOGIN) {
        // some checks TODO
        const HEADERS = {
          "Content-Type": "application/json",
        };

        let user: user = {
          userID: action.payload.id,
          name: action.payload.name,
          password: action.payload.password,
        };

        user.password = CryptoJS.SHA256(user.password).toString(
          CryptoJS.enc.Hex
        );

        Axios.post(globals.baseURL + "/" + globals.userURL + "/login", user)
          .then(function (res: AxiosResponse) {
            // console.log(res.data);
            if (res.status == 200) {
              action.data = {
                user: user,
              };
              // redirect to register successful page
              const nextAction = next(action);
              //read next state
              const state = getState();
              // return the next action
              return nextAction;
            }
            if (res.status == 430) {
              // redirect to register successfull page
              action.data = {
                user: null,
              };
              // redirect to register successful page
              const nextAction = next(action);
              //read next state
              const state = getState();
              // return the next action
              return nextAction;
            }
          })
          .catch((error) => {
            // redirect to register successfull page
            console.log(error);
            action.data = {
              user: null,
            };
            // redirect to register successful page
            const nextAction = next(action);
            //read next state
            const state = getState();
            // return the next action
            return nextAction;
          });
      } else {
        // if nothing of the above
        // clearly this has nothing to do
        // with api, continue as such
        const nextAction = next(action);
        //read next state
        const state = getState();
        // return the next action
        return nextAction;
      }
    };
  };
}

export default APIMiddleware;
