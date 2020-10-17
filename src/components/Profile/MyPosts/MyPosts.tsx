import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {StateProfilePagePostsItemType,} from "../../../redux/profilePageReducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Element} from "../../common/FormsControl/FormsControl";


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

const maxLength10 = maxLengthCreator(10)

const TextArea = Element('textarea')

function ProfileAddMessageForm(props: InjectedFormProps<MyPostsFormDataType>) {

    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={TextArea}
                           name={'profileMyPostsMessage'}
                           placeholder={'Enter your message'}
                           validate={[required, maxLength10]}
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