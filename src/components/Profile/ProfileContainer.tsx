import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ResponseProfilePageType, StateProfileObjectPageType} from "../../redux/profilePageReducer";
import {RouteComponentProps, withRouter} from 'react-router'
import {StateAuthObjectType} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";

type mapStateToPropsType = {
    profile: ResponseProfilePageType | null
    isAuth: boolean
}

type MapStateToPropsStateMergeType = StateProfileObjectPageType & StateAuthObjectType

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
        let userId = Number(this.props.match.params.userId)
        if (!userId) userId = 2
        this.props.getUserProfile(userId)
    }

    render() {

        if (!this.props.isAuth) return <Redirect to={'/login/'}/>

        return (
            <Profile profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state: MapStateToPropsStateMergeType): mapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
    }
}

const mapDispatchToProps = {
    getUserProfile,
}

const UrlDataContainerComponentWithRouter = withRouter(ProfileContainer)

export default connect(mapStateToProps, mapDispatchToProps)(UrlDataContainerComponentWithRouter)