import React, {useEffect} from "react"
import Profile from "./Profile"
import {connect} from "react-redux"
import {
    getUserProfile,
    getUserStatus,
    savePhoto, saveProfile,
    StateProfileObjectPageType, updateUserStatus
} from "../../redux/profilePageReducer"
import {RouteComponentProps, withRouter} from 'react-router'
import {compose} from "redux"
import {StateAuthObjectType} from "../../redux/authReducer"
import {ResponseProfileType} from "../../types/types"


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


export const ProfileContainer: React.FC<ProfileContainerPropsType> = (
    {
        match, authorizedUserId, history, getUserProfile, getUserStatus,
        profile, status, updateUserStatus, savePhoto, saveProfile
    }
) => {

    const refreshProfile = () => {
        // const urlParams = new URLSearchParams(window.location.search);
        // const id = urlParams.get('id');
        let userId = Number(match.params.userId) || null
        if (!userId) {
            userId = authorizedUserId
            if (!userId) return history.push('/login/')
        }
        if (!userId) {
            throw new Error('ID should exists in URI params or in state("authorizedUserId")')
        } else {
            getUserProfile(userId)
            getUserStatus(userId)
        }
    }

    useEffect(() => {
        refreshProfile()
    }, [match.params.userId])

    return <Profile
        isOwner={!match.params.userId}
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatus}
        onSavePhoto={savePhoto}
        saveProfile={saveProfile}
    />
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