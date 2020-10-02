import React from "react";
import s from './ProfileInfo.module.css'
import {ResponseProfilePageType} from "../../../redux/ProfilePageReducer";
import {Preloader} from "../../common/Preloader/Preloader";

type ProfileInfoPropsType = {
    profile: ResponseProfilePageType | null
}

function ProfileInfo(props: ProfileInfoPropsType) {
    return (
        <div>
            <div className={s.divContentImg}><img className='contentImg' src="" alt=""/></div>
            <div className={s.descriptionBlock}>
                {props.profile ? <img src={props.profile.photos.large} alt=""/> : <Preloader/>}
                ava + desription
            </div>
        </div>
    )
}

export default ProfileInfo