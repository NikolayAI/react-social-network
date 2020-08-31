import React from "react";
import s from './Profile.module.css'
import MyPosts, { MyPostsType } from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type ProfileType = {
    state: MyPostsType
}

function Profile(props: ProfileType) {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.state.posts}/>
        </div>
    )
}

export default Profile