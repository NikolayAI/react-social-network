import React from 'react'
import s from './index.module.css'
import { Post } from './Post'
import { InjectedFormProps, reduxForm } from 'redux-form'
import {
    maxLengthCreator,
    required,
} from '../../../utils/validators/validators'
import {
    createField,
    GetStringKeys,
    TextareaElement,
} from '../../../components/FormsControl'
import { profileActions } from '../../../reducers/profilePageReducer'
import { useSelector } from 'react-redux'
import { getPosts } from '../../../selectors/profileSelectors'

export const MyPosts: React.FC = () => {
    const posts = useSelector(getPosts)

    const handleSubmit = (profileMyPostsFormData: MyPostsFormDataType) => {
        profileActions.addPostAC(profileMyPostsFormData.profileMyPostsMessage)
    }

    let postsElement = posts
        .map((p) => (
            <Post
                key={p.id}
                message={p.message}
                likesCount={p.likesCount}
                id={p.id}
            />
        ))
        .reverse()

    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>
            <ProfileAddMessageReduxForm onSubmit={handleSubmit} />
            <div className={s.posts}>{postsElement}</div>
        </div>
    )
}

type MyPostsFormDataType = {
    profileMyPostsMessage: string
}

type ProfileMyPostsFormDataKeysType = GetStringKeys<MyPostsFormDataType>
const maxLength10 = maxLengthCreator(10)

const ProfileAddMessageForm: React.FC<
    InjectedFormProps<MyPostsFormDataType>
> = ({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
        <div>
            {createField<ProfileMyPostsFormDataKeysType>(
                'Enter your message',
                'profileMyPostsMessage',
                [required, maxLength10],
                TextareaElement
            )}
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
)

const ProfileAddMessageReduxForm = reduxForm<MyPostsFormDataType>({
    form: 'profileMyPostsForm',
})(ProfileAddMessageForm)
