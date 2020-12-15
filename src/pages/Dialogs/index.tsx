import React, { useCallback } from 'react'
import s from './index.module.css'
import { DialogItem } from './DialogItem'
import { Dialog } from './Dialog'
import { dialogsActions } from '../../redux/reducers/dialogsPageReducer'
import { InjectedFormProps, reduxForm, reset } from 'redux-form'
import { createField, TextareaElement } from '../../components/FormsControl'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getIsAuth } from '../../redux/selectors/authSelectors'
import { getDialogs, getMessages } from '../../redux/selectors/dialogsSelectors'

const Dialogs: React.FC = React.memo(() => {
    const dispatch = useDispatch()
    const isAuth = useSelector(getIsAuth)
    const dialogs = useSelector(getDialogs)
    const messages = useSelector(getMessages)

    const handleAddNewDialogsMyPostsMessage = useCallback(
        (dialogsMyPostsFormData: DialogsMyPostsFormDataType) => {
            console.log(dialogsMyPostsFormData.dialogsMyPostsMessage)
            dispatch(
                dialogsActions.addMessage(dialogsMyPostsFormData.dialogsMyPostsMessage)
            )
            dispatch(reset('dialogsMyPostsForm'))
        },
        [dispatch]
    )

    if (!isAuth) return <Redirect to={'/login/'} />

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
})

type DialogsMyPostsFormDataType = {
    dialogsMyPostsMessage: string
}

type DialogsMyPostsFormDataKeysType = Extract<keyof DialogsMyPostsFormDataType, string>

const DialogsAddMessageForm: React.FC<InjectedFormProps<DialogsMyPostsFormDataType>> = ({
    handleSubmit,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<DialogsMyPostsFormDataKeysType>(
                    'Enter your message',
                    'dialogsMyPostsMessage',
                    [],
                    TextareaElement
                )}
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}

const DialogsAddMessageReduxForm = reduxForm<DialogsMyPostsFormDataType>({
    form: 'dialogsMyPostsForm',
})(DialogsAddMessageForm)

export default Dialogs
