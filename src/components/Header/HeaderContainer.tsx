import React from "react";
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserDataAC, StateAuthObjectType, StateAuthType} from "../../redux/authReducer";

type HeaderContainerPropsType = {
    setAuthUserDataAC: (data: StateAuthType) => void
    isAuth: boolean
    login: string | null
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.setAuthUserDataAC(response.data.data)
                }
            })
    }

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login}/>
    }
}

type mapStateToProps = {
    isAuth: boolean
    login: string | null
}

const mapStateToProps = (state: StateAuthObjectType): mapStateToProps => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

const mapDispatchToProps = {
    setAuthUserDataAC,
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)