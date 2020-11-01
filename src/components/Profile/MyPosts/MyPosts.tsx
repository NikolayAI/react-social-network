import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {createField, GetStringKeys, TextareaElement} from "../../common/FormsControl/FormsControl";
import {StateProfilePagePostsItemType} from "../../../redux/profilePageReducer";


export type MyPostsPropsType = {
    posts: StateProfilePagePostsItemType[]
    addPostHandler: (text: string) => void
}

const MyPosts = (props: MyPostsPropsType) => {

    const onSubmit = (profileMyPostsFormData: MyPostsFormDataType) => {
        props.addPostHandler(profileMyPostsFormData.profileMyPostsMessage)
    }

    let postsElement = props.posts.map(
        p => <Post key={p.id} message={p.message} likesCount={p.likesCount} id={p.id}/>
        ).reverse()

    return (
        <div className={s.postsBlock}><h3>my posts</h3>
            <ProfileAddMessageReduxForm onSubmit={onSubmit}/>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}

type MyPostsFormDataType = {
    profileMyPostsMessage: string
}

type ProfileMyPostsFormDataKeysType = GetStringKeys<MyPostsFormDataType>

const maxLength10 = maxLengthCreator(10)

const ProfileAddMessageForm: React.FC<InjectedFormProps<MyPostsFormDataType>> = (props) => {

    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    {createField<ProfileMyPostsFormDataKeysType>('Enter your message',
                        'profileMyPostsMessage', [required, maxLength10], TextareaElement)}
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
        </>
    )

}

const ProfileAddMessageReduxForm = reduxForm<MyPostsFormDataType>({
    form: 'profileMyPostsForm'
})(ProfileAddMessageForm)

export default MyPosts
