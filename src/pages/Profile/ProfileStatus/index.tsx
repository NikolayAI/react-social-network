import React from 'react'
import { useProfileStatus } from './useProfileStatus'

type ProfileStatusPropstype = {
    isOwner: boolean
}

export const ProfileStatus: React.FC<ProfileStatusPropstype> = ({
    isOwner,
}) => {
    const {
        editMode,
        handleStatusChange,
        handleDeActivateEditMode,
        statusProfile,
        handleActivateEditMode,
        status,
    } = useProfileStatus()

    return (
        <>
            <b>Status: </b>
            {isOwner && editMode ? (
                <input
                    autoFocus={true}
                    onChange={handleStatusChange}
                    onBlur={handleDeActivateEditMode}
                    value={statusProfile}
                />
            ) : isOwner ? (
                <span onDoubleClick={handleActivateEditMode}>
                    {status || '-------'}
                </span>
            ) : (
                <span>{status || '-------'}</span>
            )}
        </>
    )
}
