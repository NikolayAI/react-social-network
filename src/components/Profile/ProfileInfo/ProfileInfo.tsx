import React from "react";
import s from './ProfileInfo.module.css'

function ProfileInfo() {
    return (
        <div>
            <div className={s.divContentImg}><img className='contentImg' src="" alt=""/></div>
            <div className={s.descriptionBlock}>ava + desription</div>
        </div>
    )
}

export default ProfileInfo