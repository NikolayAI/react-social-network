import React, {ReactNode} from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ResponseProfilePageType} from "../../redux/ProfilePageReducer";

type ProfilePropsType = {
    children?: ReactNode
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