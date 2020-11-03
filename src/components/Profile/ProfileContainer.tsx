import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfile,
    getUserStatus,
    savePhoto, saveProfile,
    StateProfileObjectPageType, updateUserStatus
} from "../../redux/profilePageReducer";
import {RouteComponentProps, withRouter} from 'react-router'
import {compose} from "redux";
import {StateAuthObjectType} from "../../redux/authReducer";
import {ResponseProfileType} from "../../types/types";

type mapStateToPropsType = {
    profile: ResponseProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type mapDispatchToPropsType = {
    getUserProfile: (userId: number | null) => void
    getUserStatus: (userId: number | null) => void
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (data: any) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type ProfileContainerPropsType = RouteComponentProps<PathParamsType>
    & mapStateToPropsType
    & mapDispatchToPropsType

// const urlParams = new URLSearchParams(window.location.search);
// const id = urlParams.get('id');

export class ProfileContainer extends React.Component<ProfileContainerPropsType>{

    refreshProfile = () => {
        let userId = Number(this.props.match.params.userId) || null
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) this.props.history.push('/login/')
        }
        if (!userId) {
            throw new Error('ID should exists in URI params or in state("authorizedUserId")')
        } else {
            this.props.getUserProfile(userId)
            this.props.getUserStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: ProfileContainerPropsType, prevState: ProfileContainerPropsType) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) this.refreshProfile()
    }

    render() {
        return (
            <Profile
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateUserStatus={this.props.updateUserStatus}
                onSavePhoto={this.props.savePhoto}
                saveProfile={this.props.saveProfile}
            />
        )
    }
}

type MergedMapStateToPropsArgumentType = StateProfileObjectPageType & StateAuthObjectType

const mapStateToProps = (state: MergedMapStateToPropsArgumentType): mapStateToPropsType => {
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
    savePhoto,
    saveProfile,
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter)
(ProfileContainer)