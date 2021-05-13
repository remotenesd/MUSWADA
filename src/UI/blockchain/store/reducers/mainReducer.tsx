// import * as mocker from '../../TODOs/TODOsMocker';
import * as action from '../Actions/actionCreator';
import * as actionTypes from '../Actions/actionTypes';
import * as defs from '../core/defs';
import {store} from '../store';
import { TODO as TODODEF, TODOSTATUS  } from '../core/defs';
import { convertToPriority, convertToStatus } from '../Actions/converters';

const initialState = {
    todos : Array<TODODEF>(),
    forbiddenWordsFlag : false,
    priorities : [convertToPriority( defs.TODOPRIORITY.ALL ) ],
    status : [convertToStatus(defs.TODOSTATUS.ANY)],
}

function rootReducer (state = initialState, action) {
    // console.log('MAIN REDUCER ');
   

    // console.log('MAIN REDUCER ');
    if (action.type === actionTypes.GET_TODOS)
    {
        // if any data present
        if (action.data)
        {
            const obj =  {
                todos : action.data,
                forbiddenWordsFlag : state.forbiddenWordsFlag,
                priorities : state.priorities,
                status : state.status,
            }
            // console.log(obj)
            return obj
        }
    }
    else if (action.type === actionTypes.ADD_TODO)
    {
        // console.log(state.todos.concat(action.payload.todo));
        if (action.payload.todo)
        {
            return Object.assign({}, state, {
                todos : state.todos.concat(action.payload.todo),
            });
        }
        else{
            return Object.assign({}, state);
        }
       
        // state.todos.push(action.payload);
    }
    else if (action.type === actionTypes.FORBIDDEN_WORDS_TODO)
    {
        return Object.assign({}, 
                        state,
                        {
                            todos : state.todos,
                            forbiddenWordsFlag : true,
                        });
    }
    else if (action.type === actionTypes.CLEAR_FLAGS)
    {
        return Object.assign({} , state, {
            todos : state.todos,
            forbiddenWordsFlag : false,
        })
    }
    else if (action.type === actionTypes.FILTER_BY_PRIORITY)
    {
        // console.log(action.payload.priority)
        return Object.assign({} , state, {
            priorities : action.payload.priority.map(p => convertToPriority(p)),
        })
    }
    else if (action.type === actionTypes.FILTER_BY_STATUS)
    {
        // console.log(action.payload.priority)
        return Object.assign({} , state, {
            status : action.payload.status.map(p=>convertToStatus(p)),
        })
    }
    else if(action.type === actionTypes.PRIORITISE_TODO)
    {
        // console.log(state);
        return Object.assign({}, state, {
            todos : state.todos.map(todo => {
                if(todo.id === action.payload.id)
                {
                    // console.log(action.payload.priority)
                    todo.priority = action.payload.priority;
                }
                return todo;
            })
        })
    }
    else if(action.type === actionTypes.MARK_TODO)
    {
        return Object.assign({}, state, {
            todos : state.todos.map(todo => {
                if(todo.id === action.payload.id)
                {
                    // console.log(action.payload.priority)
                    todo.status = action.payload.mark;
                }
                return todo;
            })
        })
    }

    return state;
}

export default rootReducer;