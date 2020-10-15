import React, {useEffect, useState} from "react";

type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

function ProfileStatus(props: ProfileStatusPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    const activateEditModeHandler = () => setEditMode(true)
    const deActivateEditModeHandler = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }
    const statusChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
        <>
            {editMode
                ? <div><input autoFocus={true} onChange={statusChangeHandler} onBlur={deActivateEditModeHandler}
                              value={status}/></div>
                : <div><span onDoubleClick={activateEditModeHandler}>{props.status || '-------'}</span></div>}
        </>
    )

}

export default ProfileStatus