import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {DispatchActionsType, StateProfilePagePostsItemType,} from "../../../redux/state";
import {addPostActionCreator, updatePostActionCreator} from "../../../redux/ProfilePageReducer";


export type MyPostsPropsType = {
    posts: StateProfilePagePostsItemType[]
    dispatch: (action: DispatchActionsType) => void
    newPostText: string
}


function MyPosts(props: MyPostsPropsType) {

    let postsElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} id={p.id}/>)

    let newPost = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        props.dispatch(addPostActionCreator())
    }

    const newPostTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updatePostActionCreator(e.currentTarget.value))
    }

    return (
        <div className={s.postsBlock}><h3>my posts</h3>
            <div>
                <div>
                    <textarea ref={newPost} value={props.newPostText} onChange={newPostTextHandler}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}

export default MyPosts