import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {DispatchActionsType, StateProfilePageType} from "../../redux/state";

type ProfilePropsType = {
    profilePage: StateProfilePageType
    dispatch: (action: DispatchActionsType) => void
}

function Profile(props: ProfilePropsType) {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     dispatch={props.dispatch}
                     newPostText={props.profilePage.newPostText}/>
        </div>
    )
}

export default Profile