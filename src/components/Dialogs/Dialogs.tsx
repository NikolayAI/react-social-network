import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {StateDialogsPageType,} from "../../redux/dialogsPageReducer";
import { Redirect } from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type DialogsPropsType = {
    dialogsPage: StateDialogsPageType
    addMessageAC: (text: string) => void
    isAuth: boolean
}

function Dialogs(props: DialogsPropsType) {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>)

    const addNewDialogsMyPostsMessage = (dialogsMyPostsFormData: DialogsMyPostsFormDataType) => {
        props.addMessageAC(dialogsMyPostsFormData.dialogsMyPostsMessage)
    }

    if (!props.isAuth) return <Redirect to={'/login/'}/>

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

const DialogsAddMessageReduxForm = reduxForm<DialogsMyPostsFormDataType>({form: 'dialogsMyPostsForm'})(DialogsAddMessageForm)

type DialogsMyPostsFormDataType = {
    dialogsMyPostsMessage:string
}

function DialogsAddMessageForm(props: InjectedFormProps<DialogsMyPostsFormDataType>) {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={'textarea'}
                           name={'dialogsMyPostsMessage'}
                           placeholder={'Enter your message'}
                    />
                </div>
                <div>
                    <button>Send message</button>
                </div>
            </form>
        </>
    )
}

export default Dialogs