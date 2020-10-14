import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ResponseProfilePageType, StateProfileObjectPageType} from "../../redux/profilePageReducer";
import {RouteComponentProps, withRouter} from 'react-router'
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import { compose } from "redux";

type mapStateToPropsType = {
    profile: ResponseProfilePageType | null
}

type mapDispatchToPropsType = {
    getUserProfile: (userId: number | null) => void
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
        if (!userId) userId = 2
        this.props.getUserProfile(userId)
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state: StateProfileObjectPageType): mapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
    }
}

const mapDispatchToProps = {
    getUserProfile,
}

export default compose<React.FC>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter)
(ProfileContainer)