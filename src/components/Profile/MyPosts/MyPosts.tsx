import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {StateProfilePagePostsItemType,} from "../../../redux/profilePageReducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


export type MyPostsPropsType = {
    posts: StateProfilePagePostsItemType[]
    addPostHandler: (text: string) => void
}

function MyPosts(props: MyPostsPropsType) {

    const addNewProfileMyPostsMessage = (profileMyPostsFormData: MyPostsFormDataType) => {
        props.addPostHandler(profileMyPostsFormData.profileMyPostsMessage)
    }

    let postsElement = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} id={p.id}/>)

    return (
        <div className={s.postsBlock}><h3>my posts</h3>
            <ProfileAddMessageReduxForm onSubmit={addNewProfileMyPostsMessage}/>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}

const ProfileAddMessageReduxForm = reduxForm<MyPostsFormDataType>({form: 'profileMyPostsForm'})(ProfileAddMessageForm)

type MyPostsFormDataType = {
    profileMyPostsMessage: string
}

function ProfileAddMessageForm(props: InjectedFormProps<MyPostsFormDataType>) {

    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={'textarea'}
                           name={'profileMyPostsMessage'}
                           placeholder={'Enter your message'}
                    />
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
        </>
    )
}

export default MyPosts