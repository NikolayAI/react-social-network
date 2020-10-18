import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout, StateAuthObjectType} from "../../redux/authReducer";
import {StateProfileObjectPageType} from "../../redux/profilePageReducer";

type HeaderContainerPropsType = {
    isAuth: boolean
    login: string | null
    smallPhoto: string | undefined
    logout: () => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    render() {
        return <Header logout={this.props.logout} isAuth={this.props.isAuth} login={this.props.login} smallPhoto={this.props.smallPhoto}/>
    }
}

type mapStateToProps = {
    login: string | null
    isAuth: boolean
    smallPhoto: string | undefined
}

const mapStateToProps = (state: StateAuthObjectType & StateProfileObjectPageType): mapStateToProps => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
        smallPhoto: state.profilePage.profile?.photos.small,
    }
}

const mapDispatchToProps = {
    logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)