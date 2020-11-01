import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ResponseProfileType} from "../../types/types";

type ProfilePropsType = {
    isOwner: boolean
    profile: ResponseProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    onSavePhoto: (file: File) => void
    saveProfile: (data: any) => Promise<any>
}

const Profile: React.FC<ProfilePropsType> = (props) => {
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