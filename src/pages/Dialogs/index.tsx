import React from 'react'
import s from './index.module.css'
import { DialogItem } from './DialogItem'
import { Dialog } from './Dialog'
import {
    StateDialogsPageType,
    dialogsActions,
} from '../../reducers/dialogsPageReducer'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, TextareaElement } from '../../components/FormsControl'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { useSelector } from 'react-redux'
import { RootStateType } from '../../reducers/reduxStore'
import { Redirect } from 'react-router-dom'
import { getIsAuth } from '../../selectors/authSelectors'
import { getDialogs, getMessages } from '../../selectors/dialogsSelectors'

const Dialogs: React.FC = () => {
    const isAuth = useSelector(getIsAuth)
    const dialogs = useSelector(getDialogs)
    const messages = useSelector(getMessages)

    const handleAddNewDialogsMyPostsMessage = (
        dialogsMyPostsFormData: DialogsMyPostsFormDataType
    ) => {
        dialogsActions.addMessageAC(
            dialogsMyPostsFormData.dialogsMyPostsMessage
        )
    }

    if (isAuth) return <Redirect to={'/login/'} />

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogs.map((d) => (
                    <DialogItem key={d.id} name={d.name} id={d.id} />
                ))}
            </div>
            <div className={s.messages}>
                {messages.map((m) => (
                    <Dialog key={m.id} message={m.message} id={m.id} />
                ))}
                <DialogsAddMessageReduxForm
                    onSubmit={handleAddNewDialogsMyPostsMessage}
                />
            </div>
        </div>
    )
}

type DialogsMyPostsFormDataType = {
    dialogsMyPostsMessage: string
}

type DialogsMyPostsFormDataKeysType = Extract<
    keyof DialogsMyPostsFormDataType,
    string
>
const maxLength50 = maxLengthCreator(50)

const DialogsAddMessageForm: React.FC<
    InjectedFormProps<DialogsMyPostsFormDataType>
> = (props) => {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    {createField<DialogsMyPostsFormDataKeysType>(
                        'Enter your message',
                        'dialogsMyPostsMessage',
                        [required, maxLength50],
                        TextareaElement
                    )}
                </div>
                <div>
                    <button>Send message</button>
                </div>
            </form>
        </>
    )
}

const DialogsAddMessageReduxForm = reduxForm<DialogsMyPostsFormDataType>({
    form: 'dialogsMyPostsForm',
})(DialogsAddMessageForm)

export default Dialogs
