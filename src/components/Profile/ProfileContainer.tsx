import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfileAC} from "../../redux/ProfilePageReducer";
import {ResponseProfilePageType, StateProfileObjectPageType, StateProfilePageType} from "../../redux/store";
import {withRouter, RouteComponentProps} from 'react-router'

type mapStateToPropsType = {
    profile: ResponseProfilePageType | null
}

type mapDispatchToPropsType = {
    setUserProfileAC: (profile: ResponseProfilePageType) => void
}

type PathParamsType = {
    userId: string
}

type OwnProfileContainerPropsType = mapStateToPropsType & mapDispatchToPropsType

type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & OwnProfileContainerPropsType

export class ProfileContainer extends React.Component<ProfileContainerPropsType>{

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = '2'
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => this.props.setUserProfileAC(response.data))
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state: StateProfileObjectPageType): mapStateToPropsType => {
    return {
        profile: state.profilePage.profile
    }
}

const mapDispatchToProps = {
    setUserProfileAC,
}

const UrlDataContainerComponentWithRouter = withRouter(ProfileContainer)

export default connect(mapStateToProps, mapDispatchToProps)(UrlDataContainerComponentWithRouter)