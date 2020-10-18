import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfile,
    getUserStatus,
    ResponseProfilePageType,
    StateProfileObjectPageType, updateUserStatus
} from "../../redux/profilePageReducer";
import {RouteComponentProps, withRouter} from 'react-router'
import {compose} from "redux";
import {StateAuthObjectType} from "../../redux/authReducer";

type mapStateToPropsType = {
    profile: ResponseProfilePageType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type mapDispatchToPropsType = {
    getUserProfile: (userId: number | null) => void
    getUserStatus: (userId: number | null) => void
    updateUserStatus: (status: string) => void
}

type PathParamsType = {
    userId: string
}

type ProfileContainerPropsType = RouteComponentProps<PathParamsType>
    & mapStateToPropsType
    & mapDispatchToPropsType

export class ProfileContainer extends React.Component<ProfileContainerPropsType>{

    componentDidMount() {
        let userId = Number(this.props.match.params.userId) || null
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) this.props.history.push('/login/')
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return (
            <Profile profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
        )
    }
}

const mapStateToProps = (state: StateProfileObjectPageType & StateAuthObjectType): mapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
    }
}

const mapDispatchToProps = {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
}

export default compose<React.FC>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter)
(ProfileContainer)