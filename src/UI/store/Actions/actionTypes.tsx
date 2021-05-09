//////////////////////////////////////////////
// AUTH STUFF //////////////////////////
//////////////////////////////////////////////
const GET_LOGIN = "GET_LOGIN";
const SET_LOGIN = "SET_LOGIN";
const REGISTER = "REGISTER";
const USERNAME_EXIST = "USERNAME_EXIST";

const LOGOUT = "LOGOUT";


//////////////////////////////////////////////
// ROUTING STUFF //////////////////////////
//////////////////////////////////////////////
const SET_ROUTE = "SET_ROUTE";
const ERASE_ROUTE = "ERASE_ROUTE";


//////////////////////////////////////////////
// BLOCKCHAIN STUFF //////////////////////////
//////////////////////////////////////////////
const B_TRANSACTION_ADD = "ADD_TRANSACTION"; // ADD A TRANSACTION TO LATEST BLOCK
const B_TRANSACTION_LIST = "LIST_TRANSACTION"; // LIST SPECIFIC BLOCK
const B_TRANSACTION_STATUS  = "STATUS_TRANSACTION"; // GET STATUS OF SPECIFIC TRANSACTION
const B_BLOCK_LIST = "LIST_BLOCK"; // LIST SPECIFIC PART OF BLOCKCHAIN // LATEST THEN ON



//////////////////////////////////////////////
// TODO STUFF //////////////////////////
//////////////////////////////////////////////

const ADD_TODO = 'TODO_ADD';
const MARK_TODO = 'TODO_MARK';
const FILTER_BY_STATUS = 'TODO_FILTER_BY_STATUS';
const FILTER_BY_PRIORITY = 'TODO_FILTER_BY_PRIORITY';
const PRIORITISE_TODO = 'TODO_PRIORITISE';
const GET_TODOS = 'TODO_GET_GROUP';
const GET_TODO = 'TODO_GET';
const FORBIDDEN_WORDS_TODO = 'TODO_FORBIDDEN_WORDS';

const CLEAR_FLAGS = 'CLEAR_FLAGS';

const P_GET_PEERS = 'GET_PEERS';
const P_GET_MY_PEER = 'GET_MY_PEER';

const M_UPDATE_REQUIRED = 'UPDATE_REQUIRED'

// CHAT STUFF ////////////////////////////////
///
const C_SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST'
const C_SEND_MESSAGE = 'SEND_MESSAGE'
const C_GET_MESSAGES = 'GET_MESSAGES'

// APPLICATION SPECIFIC STUFF
const APP_GET_FIRST_USAGE = 'GET_FIRST_USAGE'
const APP_SET_FIRST_DATA = 'SET_FIRST_DATA'


export {

    /// TODO
    ADD_TODO,
    MARK_TODO,
    PRIORITISE_TODO,
    GET_TODOS,
    GET_TODO,
    FORBIDDEN_WORDS_TODO,
    FILTER_BY_STATUS,
    FILTER_BY_PRIORITY,

    CLEAR_FLAGS,

    GET_LOGIN,
    SET_LOGIN,
    LOGOUT,
    REGISTER,
    USERNAME_EXIST,

    SET_ROUTE,
    ERASE_ROUTE,

    B_BLOCK_LIST,
    B_TRANSACTION_ADD,
    B_TRANSACTION_LIST,
    B_TRANSACTION_STATUS,

    P_GET_PEERS,
    P_GET_MY_PEER,

    M_UPDATE_REQUIRED,

    C_SEND_FRIEND_REQUEST,
    C_GET_MESSAGES,
    C_SEND_MESSAGE,

    APP_GET_FIRST_USAGE,
    APP_SET_FIRST_DATA
};
