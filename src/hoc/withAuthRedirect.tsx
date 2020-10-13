import React from "react";
import {Redirect} from "react-router-dom";
import {StateAuthObjectType} from "../redux/authReducer";
import {connect} from "react-redux";

type mapStateToPropsForRedirectType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: StateAuthObjectType): mapStateToPropsForRedirectType => {
    return {isAuth: state.auth.isAuth,}
}

export const withAuthRedirect = (Component: any): any => {
    class RedirectComponent extends React.Component<any>{
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login/'}/>
            return <Component {...this.props}/>
        }
    }
    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}