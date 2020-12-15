import { useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useEffect, useState } from 'react'
import { updateUserStatus } from '../../../redux/reducers/profilePageReducer'
import { getProfileStatus } from '../../../redux/selectors/profileSelectors'

export const useProfileStatus = () => {
    const dispatch = useDispatch()
    const status = useSelector(getProfileStatus)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [statusProfile, setStatus] = useState<string>(status)

    const handleActivateEditMode = useCallback(() => setEditMode(true), [])

    const handleStatusChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value),
        []
    )

    const handleDeActivateEditMode = useCallback(() => {
        setEditMode(false)
        dispatch(updateUserStatus(statusProfile))
    }, [dispatch, statusProfile])

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
