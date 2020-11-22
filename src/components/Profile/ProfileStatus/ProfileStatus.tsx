import React, {useEffect, useState} from "react"


type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}


const ProfileStatus: React.FC<ProfileStatusPropsType> = ({status, updateUserStatus}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [statusProfile, setStatus] = useState<string>(status)

    const activateEditModeHandler = () => setEditMode(true)
    const deActivateEditModeHandler = () => {
        setEditMode(false)
        updateUserStatus(statusProfile)
    }
    const statusChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value)

    useEffect(() => {
        setStatus(status)
    }, [status])

    return <>
        <b>Status: </b>
        {editMode
            ? <input autoFocus={true} onChange={statusChangeHandler} onBlur={deActivateEditModeHandler}
                     value={statusProfile}/>
            : <span onDoubleClick={activateEditModeHandler}>{status || '-------'}</span>}
    </>
}


export default ProfileStatus