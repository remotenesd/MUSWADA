import type {user} from '../core/core';
import * as Actions from './actionTypes';

export const getLogin = () => {};

export const setLogin = (id, name, password) => {
    return {
        type : Actions.SET_LOGIN,
        payload : {
            id : id,
            name : name,
            password : password,
        }
    };
}

export const logout = () => {
    return {
        type : Actions.LOGOUT,
        payload : {
            
        }
    };
}

export const register = (user : user) => {
    return {
        type : Actions.REGISTER,
        payload : {
            user : user,
        }
    };
}

export const usernameExist = (username : string) => {
    return {
        type : Actions.USERNAME_EXIST,
        payload : {
            username : username,
        }
    }
}

export const setRoute =  (route : string) => {
    return  {
        type : Actions.SET_ROUTE,
        payload : {
            route : route,
        }
    }
}

export const eraseRoute = () => {
    return {
        type : Actions.ERASE_ROUTE,
    }
}