import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {StateProfilePagePostsItemType,} from "../../../redux/ProfilePageReducer";


export type MyPostsPropsType = {
    posts: StateProfilePagePostsItemType[]
    newPostText: string
    addPostHandler: () => void
    newPostTextHandler: (text: string) => void
}


function MyPosts(props: MyPostsPropsType) {

    let postsElement = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} id={p.id}/>)

    let newPost = React.createRef<HTMLTextAreaElement>()

    const addPostHandler = () => props.addPostHandler()

    const newPostTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.newPostTextHandler(e.currentTarget.value)
    }

    return (
        <div className={s.postsBlock}><h3>my posts</h3>
            <div>
                <div>
                    <textarea ref={newPost} value={props.newPostText} onChange={newPostTextHandler}/>
                </div>
                <div>
                    <button onClick={addPostHandler}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}

export default MyPosts