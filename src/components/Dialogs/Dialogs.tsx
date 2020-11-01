import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {StateDialogsPageType,} from "../../redux/dialogsPageReducer";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, TextareaElement} from "../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../utils/validators/validators";

type DialogsPropsType = {
    dialogsPage: StateDialogsPageType
    addMessageAC: (text: string) => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>)

    const addNewDialogsMyPostsMessage = (dialogsMyPostsFormData: DialogsMyPostsFormDataType) => {
        props.addMessageAC(dialogsMyPostsFormData.dialogsMyPostsMessage)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <DialogsAddMessageReduxForm onSubmit={addNewDialogsMyPostsMessage}/>
            </div>
        </div>
    )
}

type DialogsMyPostsFormDataType = {
    dialogsMyPostsMessage:string
}

type DialogsMyPostsFormDataKeysType = Extract<keyof DialogsMyPostsFormDataType, string>

const maxLength50 = maxLengthCreator(50)

const DialogsAddMessageForm: React.FC<InjectedFormProps<DialogsMyPostsFormDataType>> = (props) => {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    {createField<DialogsMyPostsFormDataKeysType>('Enter your message',
                        'dialogsMyPostsMessage', [required, maxLength50], TextareaElement)}
                </div>
                <div>
                    <button>Send message</button>
                </div>
            </form>
        </>
    )
}

const DialogsAddMessageReduxForm = reduxForm<DialogsMyPostsFormDataType>({
    form: 'dialogsMyPostsForm'
})(DialogsAddMessageForm)


export default Dialogs