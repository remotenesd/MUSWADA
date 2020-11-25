import React, {  } from 'react';
import { IState } from '../store/core/core';
import { setRoute, eraseRoute } from '../store/Actions/actionCreator';
import { connect } from 'react-redux';

const spacerStyle = {
    margin : '5px',
    padding: '10px',
}

// ROUTING INJECTION
// BASICALLY ENABLE EVERY COMPONENT TO HAVE AUTOMATIC ROUTING

const mapStateToProps = (state ) => {
    return {route : state.sessionReducer.routing}
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        gotoRoute : (where : string) => {
            // console.log('@@@@@@ GOING TO' + where);
            dispatch(setRoute(where))
        },
        eraseRoute : () => dispatch(eraseRoute()),
        toggleTheme : () => ownProps.toggleTheme(),
    }
}

export const newModifiedComponent = ({component : Component, useStyle, ...rest}) => {
    // console.log({...rest});
    if (useStyle)
    {
        return routeStyler({component : connect(mapStateToProps, mapDispatchToProps)(Component), ...rest})
    }else{
        return unstyledRouteStyler({component : connect(mapStateToProps, mapDispatchToProps)(Component), ...rest})
    }
}

// const modifiedComponent = {route, gotoRoute, eraseRoute} => {
//     return (
//         <div style={spacerStyle}>
//             <Component {...rest} />
//         </div>
//     )
// }


export const routeStyler = ({component : Component, ...rest}) => {
    return  (
        <div style={spacerStyle}>
            <Component {...rest} />
        </div>
    )
}

export const unstyledRouteStyler = ({component : Component, ...rest}) => {
    console.log({...rest})
    return  (
        <Component {...rest} />
    )
}