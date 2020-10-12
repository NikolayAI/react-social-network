import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {StateDialogsPageType,} from "../../redux/dialogsPageReducer";
import { Redirect } from "react-router-dom";

type DialogsPropsType = {
    dialogsPage: StateDialogsPageType
    addMessageActionCreator: () => void
    updateMessageActionCreator: (text: string) => void
    isAuth: boolean
}

function Dialogs(props: DialogsPropsType) {

    let state = props.dialogsPage

    let newMessage = React.createRef<HTMLTextAreaElement>()

    let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>)

    const sendMessageHandler = () => props.addMessageActionCreator()


    const newMessageTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.updateMessageActionCreator(e.currentTarget.value)
    }

    if (!props.isAuth) return <Redirect to={'/login/'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <textarea ref={newMessage} value={state.newMessageText} onChange={newMessageTextHandler}/>
                </div>
                <div>
                    <button onClick={sendMessageHandler}>Send message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs