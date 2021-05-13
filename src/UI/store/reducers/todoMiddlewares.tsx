// import { AuthContext } from '../Context/auth';
import { Table, FormGroup, Form, Label, Input , Button} from 'reactstrap';
import * as mocker from '../../todo/TODOsMocker';
import {store} from '../store';
import { connect } from 'react-redux';
import { addTODO } from '../Actions/actionCreator';
import { TODO as TODODEF, TODOSTATUS  } from '../core/defs';
import { ADD_TODO, GET_TODOS } from '../Actions/actionTypes';
import Axios from 'axios';
import {globals}from '../../helpers/globals';
import {convertToStatus, convertToPriority} from './../Actions/converters';



const forbiddenDict = ['UND','MACRODAT','SPE','SPM','UIGA','STRATEGY','REPORT','CLASSIFIED']

export function forbiddenWordsMiddleware({getState , dispatch}){
    return function(next){
        return function(action) {
            // magic goes here
            // console.log('-------------- middle ware called with state ' + action);

            if (action.type === ADD_TODO)
            {
                let match = forbiddenDict.filter(word => action.payload.todo.title.includes(word));
                if (match.length > 0){
                    return dispatch({type : 'TODO_FORBIDDEN_WORDS'});
                }
                match = forbiddenDict.filter(word => action.payload.todo.content.includes(word));
                if (match.length > 0){
                    return dispatch({type : 'TODO_FORBIDDEN_WORDS'});
                }
                const nextAction = next(action);
                //read next state
                const state = getState();
                // return the next action
                return nextAction;
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



export function APIInsertion({getState, dispatch}){
    return function(next){
        return function(action){
            console.log(action.type)
            if (action.type === GET_TODOS)
            {
                // populate from API   
                Axios.get(globals.baseURL + '/' + globals.todoURL + '/list').then ( res => {
                    if (res.status === 200)
                    {   
                        // redirect to register successfull page
                        // this.setState(  { tag :  res.data.tag });
                        // console.log(res.data)
                        action.data   = res.data.todos ;
                        // console.log(action.data);
                        if (true){
                            action.data = action.data.map (todo  => {
                                let t : TODODEF = {} as TODODEF;
                                t.id = todo.id;
                                t.title = todo.title;
                                t.content = todo.content;
                                t.priority = convertToPriority(todo.priority);
                                t.status = convertToStatus(todo.status);
                                // console.log(todo);
                                return t;
                            });
                        }
                        else{
                            action.data = undefined;
                        }
                        

                        const nextAction = next(action);
                        //read next state
                        const state = getState();
                        // return the next action
                        return nextAction;
                    }
                });
            }
            else if (action.type === ADD_TODO)
            {
                // save todo !
                Axios.post(globals.baseURL + '/' + globals.todoURL + '/save', action.payload.todo).then ( res => {
                    // console.log(res.status);
                    if (res.status == 200)
                    {   
                        // redirect to register successfull page
                        // this.setState(  { tag :  res.data.tag });
                        // console.log('saved !');

                    }
                    const nextAction = next(action);
                    //read next state
                    const state = getState();
                    // return the next action
                    return nextAction;
                });

                
            }
            else{
                const nextAction = next(action);
                //read next state
                const state = getState();
                // return the next action
                return nextAction;
            }
        }
    }
}