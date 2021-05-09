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
   

    return state;
}

export default rootReducer;