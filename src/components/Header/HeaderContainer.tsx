import React from "react"
import Header from "./Header"
import {connect} from "react-redux"
import {logout, StateAuthObjectType} from "../../redux/authReducer"
import {StateProfileObjectPageType} from "../../redux/profilePageReducer"


const HeaderContainer: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
    {logout, isAuth, login, smallPhoto}
) => (<Header logout={logout} isAuth={isAuth} login={login} smallPhoto={smallPhoto}/>)


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