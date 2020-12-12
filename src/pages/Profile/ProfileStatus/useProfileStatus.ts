import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from '../../../reducers/reduxStore'
import React, { useEffect, useState } from 'react'
import { updateUserStatus } from '../../../reducers/profilePageReducer'
import { getProfileStatus } from '../../../selectors/profileSelectors'

export const useProfileStatus = () => {
    const dispatch = useDispatch()
    const status = useSelector(getProfileStatus)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [statusProfile, setStatus] = useState<string>(status)

    const handleActivateEditMode = () => setEditMode(true)
    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setStatus(e.currentTarget.value)

    const handleDeActivateEditMode = () => {
        setEditMode(false)
        dispatch(updateUserStatus(statusProfile))
    }

    useEffect(() => {
        setStatus(status)
    }, [status])

    return {
        editMode,
        handleStatusChange,
        handleDeActivateEditMode,
        statusProfile,
        handleActivateEditMode,
        status,
    }
}
