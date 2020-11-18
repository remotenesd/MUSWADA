import Axios, { AxiosResponse } from "axios";
import { globals } from "../../helpers/globals";
import { P_GET_PEERS } from "../Actions/actionTypes";

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
                                    // redirect to register successful page
                                    const nextAction = next(action);
                                    //read next state
                                    const state = getState();
                                    // return the next action
                                    return nextAction;
                            }
                            else{
                                action.data = {
                                    peers: null,
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