import React from "react";
import s from './MyPosts.module.css'
import Post, {PostType} from "./Post/Post";

export type MyPostsType = {
    posts: PostType[]
}

export type MyPostsPropsType = {
    posts: PostType[]
    addPost: (postMessege: string) => void
}

function MyPosts(props: MyPostsPropsType) {

    let postsElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} id={p.id}/>)

    let newPost = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        if (newPost.current) {
            let text = newPost.current.value
            props.addPost(text)
            newPost.current.value = ''
        }
    }


    return (
        <div className={s.postsBlock}><h3>my posts</h3>
            <div>
                <div>
                    <textarea ref={newPost}></textarea>
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