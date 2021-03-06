import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootStateType } from '../../redux/reducers/rootReducer1'

type mapStateToPropsForRedirectType = {
    isAuth: boolean
}

type mapDispatchToPropsForRedirectType = {}

const mapStateToPropsForRedirect = (
    state: RootStateType
): mapStateToPropsForRedirectType => ({
    isAuth: state.auth.isAuth,
})

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<
        mapStateToPropsForRedirectType & mapDispatchToPropsForRedirectType
    > = (props) => {
        const { isAuth, ...rest } = props
        if (!props.isAuth) return <Redirect to={'/login/'} />
        return <WrappedComponent {...(rest as WCP)} />
    }

    return connect<
        mapStateToPropsForRedirectType,
        mapDispatchToPropsForRedirectType,
        WCP,
        RootStateType
    >(
        mapStateToPropsForRedirect,
        {}
    )(RedirectComponent)
}
