import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout, StateAuthObjectType} from "../../redux/authReducer";
import {StateProfileObjectPageType} from "../../redux/profilePageReducer";


class HeaderContainer extends React.Component<mapStateToPropsType & mapDispatchToPropsType> {

    render() {
        return <Header logout={this.props.logout} isAuth={this.props.isAuth} login={this.props.login} smallPhoto={this.props.smallPhoto}/>
    }
}

type mapStateToPropsType = {
    login: string | null
    isAuth: boolean
    smallPhoto: string | undefined
}

type mapDispatchToPropsType = {
    logout: () => void
}

type MergedMapStateToPropsArgumentsType = StateAuthObjectType & StateProfileObjectPageType

const mapStateToProps = (state: MergedMapStateToPropsArgumentsType): mapStateToPropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
        smallPhoto: state.profilePage.profile?.photos.small,
    }
}

const mapDispatchToProps: mapDispatchToPropsType = {
    logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)