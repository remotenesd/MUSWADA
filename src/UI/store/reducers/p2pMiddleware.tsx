import Axios, { AxiosResponse } from "axios";
import { globals } from "../../helpers/globals";
import { getMyPeers, getPeers } from "../Actions/actionCreator";
import { M_UPDATE_REQUIRED, P_GET_MY_PEER, P_GET_PEERS, SET_ROUTE } from "../Actions/actionTypes";
import { store } from "../store";
import { useSelector } from 'react-redux';

export function p2pMiddleware({getState, dispatch}){
    return function(next){
        return function(action) {
            // magic goes here
            // console.log('-------------- middle ware called with state ' + action);

         
            if (action.type === SET_ROUTE)
            {
                // Implement specific actions for certain routes
                if (action.payload.route === '/home')
                {
                    // todo

                }
                if (action.payload.route === '/blockchain')
                {
                    // we should get initially the list of peers and info about
                    // my peer.
                    dispatch(getPeers());
                    dispatch(getMyPeers());
                    return next(action)
                }else {
                    // otherwise.
                    return next(action)
                }
                // dispatch()
            }
            else{

                return next(action)
            }
        }
    }
}