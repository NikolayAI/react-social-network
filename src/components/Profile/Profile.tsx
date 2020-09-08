import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {StateProfilePageType} from "../../redux/state";

type ProfilePropsType = {
    profilePage: StateProfilePageType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

function Profile(props: ProfilePropsType) {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     addPost={props.addPost}
                     newPostText={props.profilePage.newPostText}
                     updateNewPostText={props.updateNewPostText}/>
        </div>
    )
}

export default Profile