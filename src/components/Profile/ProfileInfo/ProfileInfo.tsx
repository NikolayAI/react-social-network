import React from "react";
import s from './ProfileInfo.module.css'
import {ResponseProfilePageType} from "../../../redux/profilePageReducer";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatus from "../../ProfileStatus/ProfileStatus";

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
                <ProfileStatus status={'hello my friends'}/>
            </div>
        </div>
    )
}

export default ProfileInfo