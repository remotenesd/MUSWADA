import type {transaction, user, block, blockchain} from '../core/core';
import * as Actions from './actionTypes';
import * as Defs from './.././core/defs';

export const getLogin = () => {
    return {
        type : Actions.GET_LOGIN
    };
}

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

export const addTransaction = (t : transaction) => {
    return {
        type : Actions.B_TRANSACTION_ADD,
        payload : {
            transaction : t,
        }
    }
}

export const listTransaction = (blockhash : string) => {
    return {
        type : Actions.B_TRANSACTION_LIST,
        payload : {
            blockhash : blockhash,
        }
    }
}
export const listBlock = () => {
    return {
        type : Actions.B_BLOCK_LIST,
        // payload : {
        //     transaction : t,
        // }
    }
}


/////// TODOS STUFF


export const clearFlags = () => {
    return {
        type : Actions.CLEAR_FLAGS,
    }
};


export const addTODO = (todo : Defs.TODO) => {
    // add a todo
    return {
        type : Actions.ADD_TODO,
        payload : {todo : todo,}
    }
}

export const markTODO = (id :number,whatMark : Defs.TODOSTATUS) => {
    // which mark ?
    return {
        type : Actions.MARK_TODO,
        payload : {mark : whatMark,id : id}
    };
}

export const prioritiseTODO = (id : number, whatPriority : Defs.TODOPRIORITY) => {
    return {
        type : Actions.PRIORITISE_TODO,
        payload : {priority : whatPriority, id : id}
    }
}

export const filterByStatus = ( whatStatus : Defs.TODOSTATUS) => {
    return {
        type : Actions.FILTER_BY_STATUS,
        payload : {status : whatStatus}
    };
}

export const filterByPriority = (whatStatus : Defs.TODOPRIORITY) => {
    return {
        type : Actions.FILTER_BY_PRIORITY,
        payload : {priority : whatStatus,}
    };
}

export const getTODOS = () => {
    return {
        type : Actions.GET_TODOS,
    }
}

export const getTODO = (id : number) => {
    return {
        type : Actions.GET_TODO,
        payload : {id : id,}
    }
}

export const getPeers = () => {
    return {
        type : Actions.P_GET_PEERS
    }
}

export const getMyPeers = () => {
    return {
        type : Actions.P_GET_MY_PEER
    }
}

export const fakeDispatch = () => {
    return  {
        type : 'FAKE_DISPATCH'
    }
}

export const updateRequired =  () => {
    return {
        type : Actions.M_UPDATE_REQUIRED,
    }
}

export const sendFriendRequest = (id : number) => {
    return {
        type : Actions.C_SEND_FRIEND_REQUEST,
        payload : {id : id,}
    }
}

export const sendMessage = (id : number, message : string) => {
    return {
        type : Actions.C_SEND_MESSAGE,
        payload : {
            id : id,
            message : message,
        }
    }
}

export const getMessages = () => {
    return {
        type : Actions.C_GET_MESSAGES,
    }
}

export const getFirstUsage = () => {
    return {
        type : Actions.APP_GET_FIRST_USAGE,
    }
}

export const initialiseSetup = (initData) => {
    return {
        type : Actions.APP_SET_FIRST_DATA,
        payload : initData
    }
}