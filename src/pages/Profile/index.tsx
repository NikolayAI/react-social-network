import React from 'react'
import { ProfileInfo } from './ProfileInfo'
import { MyPosts } from './MyPosts'
import { useRefreshProfile } from './useRefreshProfile'

const Profile: React.FC = () => {
    const {
        userId,
        savePhoto,
        saveProfile,
        authorizedUserId,
    } = useRefreshProfile()

    return (
        <>
            <ProfileInfo
                isOwner={userId === undefined && authorizedUserId !== userId}
                onSavePhoto={savePhoto}
                onSaveProfile={saveProfile}
            />
            <MyPosts />
        </>
    )
}

export default Profile
