import React, { useCallback } from 'react'
import s from './index.module.css'
import { Post } from './Post'
import { InjectedFormProps, reduxForm, reset } from 'redux-form'
import {
    createField,
    GetStringKeys,
    TextareaElement,
} from '../../../components/FormsControl'
import { profileActions } from '../../../redux/reducers/profilePageReducer'
import { useDispatch, useSelector } from 'react-redux'
import { selectPosts } from '../../../redux/selectors/profileSelectors'

export const MyPosts: React.FC = React.memo(() => {
    const dispatch = useDispatch()
    const posts = useSelector(selectPosts)

    const handleSubmit = useCallback(
        (profileMyPostsFormData: MyPostsFormDataType) => {
            dispatch(profileActions.addPost(profileMyPostsFormData.profileMyPostsMessage))
            dispatch(reset('profileMyPostsForm'))
        },
        [dispatch]
    )

    let postsElement = posts
        .map((p) => (
            <Post key={p.id} message={p.message} likesCount={p.likesCount} id={p.id} />
        ))
        .reverse()

    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>
            <ProfileAddMessageReduxForm onSubmit={handleSubmit} />
            <div className={s.posts}>{postsElement}</div>
        </div>
    )
})

type MyPostsFormDataType = {
    profileMyPostsMessage: string
}

type ProfileMyPostsFormDataKeysType = GetStringKeys<MyPostsFormDataType>

const ProfileAddMessageForm: React.FC<InjectedFormProps<MyPostsFormDataType>> = ({
    handleSubmit,
}) => (
    <form onSubmit={handleSubmit}>
        <div>
            {createField<ProfileMyPostsFormDataKeysType>(
                'Enter your message',
                'profileMyPostsMessage',
                [],
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
