import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserDataAC, setAuthUserPhotoAC, StateAuthObjectType} from "../../redux/authReducer";
import {authAPI, profileAPI} from "../../api/api";

type HeaderContainerPropsType = {
    setAuthUserDataAC: (userId: number|null, login: string|null, email: string|null) => void
    setAuthUserPhotoAC: (userPhoto: string | null) => void
    isAuth: boolean
    login: string | null
    smallPhoto: string | null
    userId: number | null
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        authAPI.getLogin()
            .then(response => {
                if (response.data.resultCode === 0) {
                    const {id, login, email} = response.data.data
                    this.props.setAuthUserDataAC(id, login, email)
                }
            }).then(() => {
                profileAPI.getProfile(this.props.userId)
                    .then(smallPhoto => {
                        this.props.setAuthUserPhotoAC(smallPhoto)
                        })
                    })
                }

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
    setAuthUserDataAC,
    setAuthUserPhotoAC,
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)