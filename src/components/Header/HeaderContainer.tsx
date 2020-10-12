import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, StateAuthObjectType} from "../../redux/authReducer";

type HeaderContainerPropsType = {
    isAuth: boolean
    login: string | null
    smallPhoto: string | null
    userId: number | null
    getAuthUserData: (userId: number | null) => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {this.props.getAuthUserData(this.props.userId)}

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login} smallPhoto={this.props.smallPhoto}/>
    }
}

type mapStateToProps = {
    userId: number | null
    login: string | null
    isAuth: boolean
    smallPhoto: string | null
}

const mapStateToProps = (state: StateAuthObjectType): mapStateToProps => {
    return {
        userId: state.auth.userId,
        login: state.auth.login,
        isAuth: state.auth.isAuth,
        smallPhoto: state.auth.smallPhoto,
    }
}

const mapDispatchToProps = {
    getAuthUserData,
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)