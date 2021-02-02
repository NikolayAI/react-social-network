import React, { useCallback, useState } from 'react'
import s from './index.module.css'
import { ProfileStatus } from '../ProfileStatus'
import {
  ProfileDataFormFormDataType,
  ProfileDataReduxForm,
} from './ProfileDataForm'
import { ResponseContactsType, ResponseProfileType } from '../../../api/api'
import { useDispatch } from 'react-redux'
import {
  savePhoto,
  saveProfile,
} from '../../../redux/reducers/profilePageReducer'

interface IProfileInfoProps {
  profile: ResponseProfileType
  isOwner: boolean
}

export const ProfileInfo: React.FC<IProfileInfoProps> = React.memo(
  ({ isOwner, profile }) => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState<boolean>(false)

    const handleOnEditMode = useCallback(() => setEditMode(true), [])
    const handleOffEditMode = useCallback(() => setEditMode(false), [])

    const handleMainPhotoSelected = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files?.length && dispatch(savePhoto(e.target.files[0]))
      },
      [dispatch]
    )

    const handleSubmit = useCallback(
      async (formData: ProfileDataFormFormDataType) => {
        await dispatch(saveProfile(formData))
        handleOffEditMode()
      },
      [dispatch, handleOffEditMode]
    )

    return (
      <div className='timeline'>
        <div className='intro box'>
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
  }
)

type ProfileDataPropsType = {
  profile: ResponseProfileType
  isOwner: boolean
  onEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = React.memo(
  ({ profile, isOwner, onEditMode }) => (
    <div className='username'>
      {isOwner && <button onClick={onEditMode}>edit</button>}
      <div>Full name: {profile.fullName && profile.fullName}</div>
      <div>Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}</div>
      {profile.lookingForAJob && (
        <div>My professional skills: {profile.lookingForAJobDescription}</div>
      )}
      <div>About me: {profile.aboutMe}</div>
      <div>
        <b>Contacts</b>:{' '}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contacts
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key as keyof ResponseContactsType]}
            />
          )
        })}
      </div>
    </div>
  )
)

type ContactPropsType = {
  contactTitle: string
  contactValue: string | null | undefined
}

export const Contacts: React.FC<ContactPropsType> = React.memo(
  ({ contactTitle, contactValue }) => (
    <div className={s.contact}>
      {contactTitle}: {contactValue}
    </div>
  )
)
