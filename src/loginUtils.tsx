import { IState } from "./UI/store/core/core";
import { LOGOUT } from "./UI/store/Actions/actionTypes";

let mapStateToProps = (state  ) => {
    // console.log(state)
    return { 
        loggedIn : state.sessionReducer.user.isLoggedInFunc(),
    };
}

let mapDispatchToProps = dispatch => (
   {
        logout : () => dispatch(LOGOUT),  
   }
)

export {
    mapStateToProps,
    mapDispatchToProps,
}