import React from 'react'
import { ProfileInfo } from './ProfileInfo'
import { MyPosts } from './MyPosts'
import { useRefreshProfile } from './useRefreshProfile'

const Profile: React.FC = () => {
    const { userId, authorizedUserId } = useRefreshProfile()

    return (
        <>
            <ProfileInfo isOwner={userId === undefined && authorizedUserId !== userId} />
            <MyPosts />
        </>
    )
}

export default Profile
