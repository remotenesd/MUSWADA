import {globals}from "../../helpers/globals";
import type { user } from "../core/core";
import * as ActionTypes from "../Actions/actionTypes";
import * as Actions from "../Actions/actionCreator";
import session from "../../storage/localStorage";
import Axios, { AxiosResponse } from "axios";
import CryptoJS from "crypto-js";
import { act } from "@testing-library/react";

function registerAPI({  dispatch, getState }) {
  return function (next) {
    return function (action) {
     console.log(action);
     if (action.type === ActionTypes.PERSONNEL_PRINT_PROFILE_DIGITAL) {
        // REGISTER THE USER
        console.log('reg')
        const HEADERS = {
          "Content-Type": "application/json",
        };

        let user = action.data.user;
        Axios.post(
          globals.baseURL + "/" + globals.persURL + "/register",
          user
        ).then((res) => {
          console.log(res.status);  
          if (res.status === 200) {
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
      } 
      else if (action.type === ActionTypes.PERSONNEL_PROFILE_SM1)
      {
          if (action.data)
          {
            
            const HEADERS = {
              "Content-Type": "application/json",
            };
            console.log(action.data.profile);
            Axios.post(
              globals.baseURL + "/" + globals.persURL + "/profile", {profile : action.data.profile}
            ).then((res) => {
            if (res.status === 200) {
                action.success = true;
                action.data = res.data;
                action.data.myid = action.data.profile;
              } else {
                action.success = false;
              }
              console.log(res.data);
              return next(action);
            });
          }
          
          return next(action);
      }
      else if (action.type === ActionTypes.PERSONNEL_PRINT_PROFILE_DIGITAL)
      {
          if (action.data)
          {
            
            const HEADERS = {
              "Content-Type": "application/json",
            };
            console.log(action.data.profile);
            Axios.post(
              globals.baseURL + "/" + globals.persURL + "/printprofile", {profile : action.data.profile}
            ).then((res) => {
              if (res.status === 200) {
                action.success = true;
                
              } else {
                action.success = false;
              }
              action.data = res.data;
              action.data.myid = action.data.profile;
              return next(action);
            });
            
          }
          
          // return next(action); /// wtf ???
      }
      else if (action.type === ActionTypes.PERSONNEL_PRINT_PROFILE_PRINTER)
      {
          if (action.data)
          {
            
            const HEADERS = {
              "Content-Type": "application/json",
            };
            console.log(action.data.profile);
            Axios.post(
              globals.baseURL + "/" + globals.persURL + "/printprofileprinter", {profile : action.data.profile._id}
            ).then((res) => {
              if (res.status === 200) {
                action.success = true;
                
              } else {
                action.success = false;
              }
              
              return next(action);
            });
            
          }
          
          // return next(action); /// wtf ???
      }
      else if (action.type === ActionTypes.PERSONEL_DEPLACER_LIST_DU)
      {
          if (action.payload)
          {
            
            const HEADERS = {
              "Content-Type": "application/json",
            };
            console.log(action.payload);
            Axios.post(
              globals.baseURL + "/" + globals.deplacerURL + "/listdu", {date_ : action.payload.date_}
            ).then((res) => {
              if (res.status === 200) {
                action.success = true;
                
              } else {
                action.success = false;
              }
              console.log(res.data);
              action.data = res.data;
              // action.data.myid = action.data.profile;
              return next(action);
            });
            
          }
          
      }
      else if (action.type === ActionTypes.PERSONNEL_LIST_PERMISSION_DU)
      {
          if (action.payload)
          {
            
            const HEADERS = {
              "Content-Type": "application/json",
            };
            console.log(action.payload);
            Axios.post(
              globals.baseURL + "/" + globals.permissionURL + "/permissionsdu", {date_ : action.payload.date_}
            ).then((res) => {
              if (res.status === 200) {
                action.success = true;
                
              } else {
                action.success = false;
              }
              console.log(res.data);
              action.data = res.data;
              // action.data.myid = action.data.profile;
              return next(action);
            });
            
          }
          
      }
      else if (action.type === ActionTypes.PERSONNEL_LIST_PERMISSION_DE)
      {
          if (action.payload)
          {
            
            const HEADERS = {
              "Content-Type": "application/json",
            };
            console.log(action.payload);
            Axios.post(
              globals.baseURL + "/" + globals.permissionURL + "/permissionsde", {personID : action.payload.personID}
            ).then((res) => {
              if (res.status === 200) {
                action.success = true;
                
              } else {
                action.success = false;
              }
              console.log(res.data);
              action.data = res.data;
              // action.data.myid = action.data.profile;
              return next(action);
            });
            
          }
      }
      else if (action.type === ActionTypes.PERSONNEL_SEND_DEPLACER)
      {
          if (action.payload)
          {
            
            const HEADERS = {
              "Content-Type": "application/json",
            };
            console.log(action.payload.deplacer.date);
            Axios.post(
              globals.baseURL + "/" + globals.deplacerURL + "/register", action.payload.deplacer
            ).then((res) => {
              console.log(res);
              if (res.status === 200) {
                action.success = true;
                
              } else {
                action.success = false;
              }
              action.data = res.data;
              // action.data.myid = action.data.profile;
              return next(action);
            });
            
          }
          else{

            return next(action);
          }
      }
      else if (action.type === ActionTypes.PERSONNEL_SEND_PERMISSION)
      {
          if (action.payload)
          {
            const HEADERS = {
              "Content-Type": "application/json",
            };
            
            Axios.post(
              globals.baseURL + "/" + globals.permissionURL + "/register", action.payload.deplacer
            ).then((res) => {
              console.log(res);
              if (res.status === 200) {
                action.success = true;
              } else {
                action.success = false;
              }
              action.data = res.data;
              // action.data.myid = action.data.profile;
              return next(action);
            });
          }
          else{

            return next(action);
          }
      }
      else if (action.type === ActionTypes.PERSONNEL_LIST_PERSONNEL)
      {
        // list the personel
        const HEADERS = {
          "Content-Type": "application/json",
        };

        Axios.get(
          globals.baseURL + "/" + globals.persURL + "/list"
        ).then((res) => {
          if (res.status === 200) {
            action.success = true;
          } else {
            action.success = false;
          }
          action.data = res.data;
          // redirect to register successful page
          const nextAction = next(action);
          //read next state
          const state = getState();
          // return the next action
          return nextAction;
        });
      }/// leave setroute to before last
      else if (action.type === ActionTypes.PERSONNEL_LIST_DEPLACER)
      {
        // list the personel
        const HEADERS = {
          "Content-Type": "application/json",
        };

        Axios.get(
          globals.baseURL + "/" + globals.deplacerURL + "/list"
        ).then((res) => {
          if (res.status === 200) {
            action.success = true;
          } else {
            action.success = false;
          }
          action.data = res.data;
          // redirect to register successful page
          const nextAction = next(action);
          //read next state
          const state = getState();
          // return the next action
          return nextAction;
        });
      }/// leave setroute to before last
      else if (action.type === ActionTypes.PERSONNEL_GET_PRISE_ARMES)
      {
        Axios.get(
          globals.baseURL + "/" + globals.persURL + "/getPriseArmes"
        ).then((res) => {
          if (res.status === 200) {
            action.success = true;
          } else {
            action.success = false;
          }
          action.data = res.data;
        
          return next(action);
        });
      }
      else if (action.type === ActionTypes.PERSONNEL_SET_PRISE_ARMES)
      {
          Axios.post(
            globals.baseURL + "/" + globals.persURL + "/setPriseArmes", action.payload
          ).then((res) => {
            if (res.status === 200) {
              action.success = true;
            } else {
              action.success = false;
            }
            action.data = res.data;
          
            return next(action);
          });
      
      }
      else if (action.type === ActionTypes.PERSONNEL_SEND_PRISE_ARMES_JOURNEE)
      {
          // send the prise armes
          Axios.post(
            globals.baseURL + "/" + globals.persURL + "/sendPriseArmes", action.payload
          ).then((res) => {
            if (res.status === 200) {
              action.success = true;
            } else {
              action.success = false;
            }
            action.data = res.data;
          
            return next(action);
          });
      }
      else if (action.type === ActionTypes.SET_ROUTE)
      {
          if (action.payload.route === 'personnel' || action.payload.route === '/personnel')
          {
              console.log("[700] LISTING PERSONNEL")
              dispatch({type : ActionTypes.PERSONNEL_LIST_PERSONNEL})
          }

          return next(action)
      }
      else {
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

export default registerAPI;
