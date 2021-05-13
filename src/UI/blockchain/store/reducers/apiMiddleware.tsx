import {globals}from "../../helpers/globals";
import { user as usr } from "../core/core";
import * as ActionTypes from "../Actions/actionTypes";
import * as Actions from "../Actions/actionCreator";
import session from "../../storage/localStorage";
import Axios, { AxiosResponse } from "axios";
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
      } 
      else if (action.type === ActionTypes.GET_LOGIN)
      {
          var ses = new session(false);
          var ax : Promise<AxiosResponse<any> | null> = ses.customLS();
          console.log("[REDUCER] UDPDATE IS LOGGED IN " + ses.user.name)
          ax.then( (res: AxiosResponse<any> | null) => {
              console.log("[AUTH0] RES " + res?.status)
              if (res != null)
              {
                  if (res?.status === 200) {
                      // successful login from middleware,
                      // engage in session creation
                      ses.createSession(ses.user)
                      console.log("[AUTH0] LOGGED IN " + ses.user.name + " => " + ses.isLoggedIn )
                      console.log(ses)
                      action.success = true;
                      action.data = ses;
                      return next(action);
                    }
                    if (res?.status === 430) {
                      ses.genNoLoginData();
                    }
              }
            })
            .catch((error) => {
              console.log(error)
              ses.genNoLoginData();
              // todo add error handling
            });
          console.log("[AUTH0] PERSISTANCE FAILED -----")
          action.success = false
          action.data = ses;
          return next(action)
      }
      else if (action.type === ActionTypes.APP_GET_FIRST_USAGE)
      {
        const HEADERS = {
          "Content-Type": "application/json",
        };

        Axios.get(globals.baseURL + "/" + globals.appURL + "/getdata").then(
          (res : AxiosResponse) => {
              // is it the first time this app has been launched ??
              if (res.status == 200)
              {
                action.success = true;
                action.data = {
                  firsttime : res.data.app.firstUsage,
                  batiment : res.data.app.batiment,
                  commandant : res.data.app.commandant,
                  batimentClass : res.data.app.batimentClass,
                }
                return next(action);
              }
              else{
                action.success = false;
                return next(action);
              }
          }
        )

      }
      else if (action.type === ActionTypes.APP_SET_FIRST_DATA)
      {
        console.log("[APP] INIT DATA SENDING")
        console.log(action.payload)
        const HEADERS = {
          "Content-Type": "application/json",
        };

        Axios.post(globals.baseURL + "/" + globals.appURL + "/setData", action.payload).then(
          (res : AxiosResponse) => {
              // is it the first time this app has been launched ??
              console.log(res)
              if (res.status == 200)
              {
                action.success = true;
                action.data = res.data
                return next(action);
              }
              else{
                action.success = false;
                return next(action);
              }
          }
        )
      }
      else if (action.type === ActionTypes.REGISTER) {
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
          // console.log(res.data.exist)
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
      } else if (action.type === ActionTypes.LOGIN_INFO)
      {
        Axios.get(
          globals.baseURL + "/" + globals.userURL + "/loginInfo",
        ).then(res => {
          if (res.status == 200)
          {
            action.success = true;
            action.data = res.data;
          }
          else{
            action.success = false;
          }
          return next(action);
        })
      } else if (action.type === ActionTypes.SET_LOGIN) {
        // some checks TODO
        const HEADERS = {
          "Content-Type": "application/json",
        };

        let user = new usr(action.payload.id, action.payload.name, action.payload.password);
        
        // {
        //   userID: action.payload.id,
        //   name: action.payload.name,
        //   password: action.payload.password,
        // };

        user.password = CryptoJS.SHA256(user.password).toString(
          CryptoJS.enc.Hex
        );
        action.data = {
                user: user,
        };

        // redirect to register successful page
        const nextAction = next(action);
        //read next state
        const state = getState();
        // return the next action
        return nextAction;

        Axios.post(globals.baseURL + "/" + globals.userURL + "/login", user)
          .then(function (res: AxiosResponse) {
            console.log(user);
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
