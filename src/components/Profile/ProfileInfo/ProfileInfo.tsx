import React from "react";
import s from './ProfileInfo.module.css'
import {ResponseProfilePageType} from "../../../redux/profilePageReducer";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import userPhoto
    from "../../../assets/images/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg";

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ResponseProfilePageType | null
    status: string
    updateUserStatus: (status: string) => void
    onSavePhoto: (file: File) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status,
                                                         updateUserStatus, isOwner, onSavePhoto}) => {
    const mainPhotoSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files && e.target.files.length && onSavePhoto(e.target.files[0])
    }

    return (
        <div>
            <div className={s.divContentImg}><img className='contentImg' src="" alt=""/></div>
            <div className={s.descriptionBlock}>
                {profile ? <img src={profile.photos.large || userPhoto} alt="profile photo" className={s.mainPhoto}/> : <Preloader/>}
                {isOwner && <input type="file" onChange={mainPhotoSelectedHandler}/>}
                <ProfileStatus status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo