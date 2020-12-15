import React, { useCallback, useState } from 'react'
import s from './index.module.css'
import { Preloader } from '../../../components/Preloader'
import { ProfileStatus } from '../ProfileStatus'
import userPhoto from '../../../common/images/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg'
import { ProfileDataFormFormDataType, ProfileDataReduxForm } from './ProfileDataForm'
import { ResponseContactsType, ResponseProfileType } from '../../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../../redux/selectors/profileSelectors'
import { savePhoto, saveProfile } from '../../../redux/reducers/profilePageReducer'

type ProfileInfoPropsType = {
    isOwner: boolean
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = React.memo(({ isOwner }) => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState<boolean>(false)
    const profile = useSelector(getProfile)

    const handleOnEditMode = useCallback(() => setEditMode(true), [])
    const handleOffEditMode = useCallback(() => setEditMode(false), [])

    const handleMainPhotoSelected = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            e.target.files?.length && dispatch(savePhoto(e.target.files[0]))
        },
        [savePhoto]
    )

    const handleSubmit = useCallback(
        async (formData: ProfileDataFormFormDataType) => {
            await dispatch(saveProfile(formData))
            handleOffEditMode()
        },
        [handleOffEditMode, saveProfile]
    )

    return (
        <div>
            <div className={s.divContentImg}>
                <img className='contentImg' src='' alt='' />
            </div>
            <div className={s.descriptionBlock}>
                {profile.photos.large ? (
                    <img
                        src={profile.photos.large || userPhoto}
                        alt='avatar'
                        className={s.mainPhoto}
                    />
                ) : (
                    <Preloader />
                )}
                {isOwner && <input type='file' onChange={handleMainPhotoSelected} />}
                <div>
                    <ProfileStatus isOwner={isOwner} />
                </div>
                {editMode ? (
                    <ProfileDataReduxForm
                        profile={profile}
                        onSubmit={handleSubmit}
                        offEditMode={handleOffEditMode}
                    />
                ) : (
                    <ProfileData
                        profile={profile}
                        isOwner={isOwner}
                        onEditMode={handleOnEditMode}
                    />
                )}
            </div>
        </div>
    )
})

type ProfileDataPropsType = {
    profile: ResponseProfileType
    isOwner: boolean
    onEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = React.memo(
    ({ profile, isOwner, onEditMode }) => (
        <>
            {isOwner && <button onClick={onEditMode}>edit</button>}
            <div>
                <b>Full name</b>: {profile.fullName && profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob && (
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
            )}
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>:{' '}
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        <Contacts
                            key={key}
                            contactTitle={key}
                            contactValue={
                                profile.contacts[key as keyof ResponseContactsType]
                            }
                        />
                    )
                })}
            </div>
        </>
    )
)

type ContactPropsType = {
    contactTitle: string
    contactValue: string | null | undefined
}

export const Contacts: React.FC<ContactPropsType> = React.memo(
    ({ contactTitle, contactValue }) => (
        <div className={s.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    )
)
