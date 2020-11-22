import React from "react"
import s from './Post.module.css'
import {StateProfilePagePostsItemType} from "../../../../redux/profilePageReducer"


const Post: React.FC<StateProfilePagePostsItemType> = ({message, likesCount}) => (
    <div className={s.item}>
        <img src="https://upload.wikimedia.org/wikipedia/ru/d/da/%D0%90%D0%B2%D0%B0%D1%82%D0%B0%D1%80_3.jpg"
             alt="commentUserAvatar"
        />
        {message}
        <div>
            <span>like</span> {likesCount}
        </div>
    </div>
)


export default Post