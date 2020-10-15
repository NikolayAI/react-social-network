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

type mapStateToPropsType = {
    profile: ResponseProfilePageType | null
    status: string
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
        console.log(this.props)
        let userId = Number(this.props.match.params.userId)
        if (!userId) userId = 11483
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return (
            <Profile profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
        )
    }
}

const mapStateToProps = (state: StateProfileObjectPageType): mapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
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