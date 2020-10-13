import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ResponseProfilePageType} from "../../redux/profilePageReducer";

type ProfilePropsType = {
    profile: ResponseProfilePageType | null
}

function Profile(props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile