import Axios, { AxiosResponse } from "axios";
import { globals } from "../../helpers/globals";
import { getMyPeers, getPeers } from "../Actions/actionCreator";
import { M_UPDATE_REQUIRED, P_GET_MY_PEER, P_GET_PEERS, SET_ROUTE } from "../Actions/actionTypes";

export function p2pMiddleware({getState, dispatch}){
    return function(next){
        return function(action) {
            // magic goes here
            // console.log('-------------- middle ware called with state ' + action);

            if (action.type === P_GET_PEERS)
            {
                // GET PEERS FROM API
                Axios.get(globals.baseURL + "/" + globals.p2pURL + "/listNodes/Force=False")
                        .then(function (res: AxiosResponse) {
                            console.log(res.data.nodes);
                            if (res.status === 200) {
                                    action.data = {
                                        peers : (res.data.nodes)
                                    };
                            }
                            else{
                                action.data = {
                                    peers: null,
                                };
                            }
                            // redirect to register successful page
                            const nextAction = next(action);
                            //read next state
                            const state = getState();
                            // return the next action
                            return nextAction;
                        })
                        .catch((error) => {
                            // redirect to register successfull page
                            console.log(error);
                            action.data = {
                                peers: null,
                            };
                            // redirect to register successful page
                            const nextAction = next(action);
                            //read next state
                            const state = getState();
                            // return the next action
                            return nextAction;
                        });
                
               
            }
            else if (action.type === P_GET_MY_PEER)
            {
                Axios.get(globals.baseURL + '/' + globals.miscURL + '/getP2PInfo').then(res => {
                    if (res.status === 200)
                    {
                        action.data = res.data
                    }
                    else{
                        action.data = null;
                    }
                    return next(action)
                }).catch(err => {
                    action.data = null;
                    return next(action)
                })
            }
            else if (action.type === SET_ROUTE)
            {
                // Implement specific actions for certain routes
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
            else if (action.type === M_UPDATE_REQUIRED)
            {
                // an update to the api is required
                // what to update ?
                Axios.get(globals.baseURL + '/' + globals.p2pURL + '/updaterequired').then(res => {
                    if (res.status === 200)
                    {
                        console.log(res.data)
                        if (res.data.components.includes('P2PLIST'))
                        {
                            // we should be updating the list of peers
                            console.log("[&&] UPDATING P2P LIST")
                            dispatch(getPeers());
                            return next(action)
                        }
                        else{
                            return next(action)
                        }
                    }
                    else{
                        action.data = null;
                    }
                    return next(action)
                }).catch(err => {
                    action.data = null;
                    return next(action)
                })
            }
            else 
            {
                const nextAction = next(action);
                //read next state
                const state = getState();
                // return the next action
                return nextAction;
            }
        }
    }
}