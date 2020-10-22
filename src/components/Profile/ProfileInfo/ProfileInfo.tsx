import React from "react";
import s from './ProfileInfo.module.css'
import {ResponseProfilePageType} from "../../../redux/profilePageReducer";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatus from "../ProfileStatus/ProfileStatus";

type ProfileInfoPropsType = {
    profile: ResponseProfilePageType | null
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status,
                                                         updateUserStatus}) => {
    return (
        <div>
            <div className={s.divContentImg}><img className='contentImg' src="" alt=""/></div>
            <div className={s.descriptionBlock}>
                {profile ? <img src={profile.photos.large} alt=""/> : <Preloader/>}
                ava + desription
                <ProfileStatus status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo