import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ResponseProfilePageType} from "../../redux/profilePageReducer";

type ProfilePropsType = {
    profile: ResponseProfilePageType | null
    status: string
    updateUserStatus: (status: string) => void
}

function Profile(props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile