import React from "react";
import {createField, InputElement, TextareaElement} from "../../common/FormsControl/FormsControl";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from './ProfileInfo.module.css'
import style from "../../common/FormsControl/FormsControl.module.css";
import {ResponseProfileType} from "../../../types/types";

export type ProfileDataFormFormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}

type ProfileDataFormPropsType = {
    profile: ResponseProfileType | null
    offEditMode: () => void
}

const ProfileDataForm: React.FC<ProfileDataFormPropsType & InjectedFormProps> = ({profile, handleSubmit,
                                                                                     offEditMode, error}) => {

    return <form onSubmit={handleSubmit}>
        <button>save</button><button onClick={offEditMode}>cancel</button>
        {error && <div className={style.formSummaryError}>{error}</div>}
        <div><b>Full name</b>:
            {createField('Full name', 'fullName', [], InputElement)}
        </div>
        <div><b>Looking for a job</b>:
            {createField('Looking for a job', 'lookingForAJob', [], InputElement, {type: 'checkbox'})}
        </div>
        <div><b>My professional skills</b>:
            {createField('My professional skills', 'lookingForAJobDescription', [], TextareaElement)}
        </div>
        <div><b>About me</b>:
            {createField('About me', 'aboutMe', [], TextareaElement)}
        </div>
        <div><b>Contacts</b>: {Object.keys(profile !== null && profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}:</b>{createField(key, 'contacts.' + key.toLocaleLowerCase(), [], InputElement)}
            </div>
        })}</div>
    </form>
}

const ProfileDataReduxForm = reduxForm<any, any>({form: 'editProfile'})(ProfileDataForm)

export default ProfileDataReduxForm