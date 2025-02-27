import { IState } from "./UI/store/core/core";
import { LOGOUT } from "./UI/store/Actions/actionTypes";

let mapStateToProps = (state  ) => {
    // console.log(state)
    return { 
        loggedIn : state.sessionReducer.isLoggedIn,
        firstUsage : state.sessionReducer.firstUsage,
    };
}


// let mapStateToProps = (state  ) => {
//         {
//             loggedIn : state.sessionReducer.isLoggedIn
//             firstUsage : state.sessionReducer.firstUsage
//         }
// }


let mapDispatchToProps = dispatch => (
   {
        logout : () => dispatch(LOGOUT),  
   }
)

export {
    mapStateToProps,
    mapDispatchToProps,
}