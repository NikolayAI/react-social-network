import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ResponseProfilePageType} from "../../redux/profilePageReducer";

type ProfilePropsType = {
    isOwner: boolean
    profile: ResponseProfilePageType | null
    status: string
    updateUserStatus: (status: string) => void
    onSavePhoto: (file: File) => void
    saveProfile: (data: any) => Promise<any>
}

function Profile(props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateUserStatus={props.updateUserStatus}
                onSavePhoto={props.onSavePhoto}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile