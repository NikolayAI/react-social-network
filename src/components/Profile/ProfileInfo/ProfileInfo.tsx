import React, {useState} from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import userPhoto
    from "../../../assets/images/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg";
import ProfileDataReduxForm, {ProfileDataFormFormDataType} from "./ProfileDataForm";
import {ResponseProfileType} from "../../../types/types";

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ResponseProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    onSavePhoto: (file: File) => void
    saveProfile: (data: any) => Promise<any>
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                         profile, status,
                                                         updateUserStatus, isOwner, onSavePhoto, saveProfile
                                                     }) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    const mainPhotoSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files && e.target.files.length && onSavePhoto(e.target.files[0])
    }

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => setEditMode(false)

    const onSubmit = (formData: ProfileDataFormFormDataType) => {
        saveProfile(formData).then(() => offEditMode())
    }


    return (
        <div>
            <div className={s.divContentImg}><img className='contentImg' src="" alt=""/></div>
            <div className={s.descriptionBlock}>
                {profile ? <img src={profile.photos.large || userPhoto} alt="profile photo" className={s.mainPhoto}/> :
                    <Preloader/>}
                {isOwner && <input type="file" onChange={mainPhotoSelectedHandler}/>}
                <div><ProfileStatus status={status} updateUserStatus={updateUserStatus}/></div>
                {editMode
                    ? <ProfileDataReduxForm profile={profile}
                                            onSubmit={onSubmit}
                                            initialValues={profile}
                                            offEditMode={offEditMode}
                    />
                    : <ProfileData profile={profile} isOwner={isOwner} onEditMode={onEditMode}/>
                }
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ResponseProfileType | null
    isOwner: boolean
    onEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, onEditMode}) => {
    return <>
        {isOwner && <button onClick={onEditMode}>edit</button>}
        <div><b>Full name</b>: {profile?.fullName}</div>
        <div><b>Looking for a job</b>: {profile?.lookingForAJob ? 'yes' : 'no'}</div>
        {profile?.lookingForAJob && <div><b>My professional skills</b>: {profile?.lookingForAJobDescription}</div>}
        <div><b>About me</b>: {profile?.aboutMe}</div>
        <div><b>Contacts</b>: {Object.keys(profile !== null && profile.contacts).map(key => {
            return <Contacts key={key}
                            contactTitle={key}
                // @ts-ignore
                            contactValue={profile?.contacts[key]}/>
        })}</div>
    </>
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}
export const Contacts: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo