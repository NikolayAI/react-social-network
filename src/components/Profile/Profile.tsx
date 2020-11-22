import React from "react"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import {ResponseProfileType} from "../../types/types"


type ProfilePropsType = {
    isOwner: boolean
    profile: ResponseProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    onSavePhoto: (file: File) => void
    saveProfile: (data: any) => Promise<any>
}


const Profile: React.FC<ProfilePropsType> = (
    {isOwner, profile, status, updateUserStatus, onSavePhoto, saveProfile}
) => (
    <div>
        <ProfileInfo
            isOwner={isOwner}
            profile={profile}
            status={status}
            updateUserStatus={updateUserStatus}
            onSavePhoto={onSavePhoto}
            saveProfile={saveProfile}
        />
        <MyPostsContainer/>
    </div>
)


export default Profile