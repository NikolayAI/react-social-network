import React from "react";
import s from './Dialogs.module.css'
import DialogItem, {DialogItemType} from "./DialogItem/DialogItem";
import Message, { MessageType } from "./Message/Message";

export type DialogsObjectsType = {
    messages: MessageType[]
    dialogs: DialogItemType[]
}

type DialogsType = {
    state: DialogsObjectsType
}

function Dialogs(props: DialogsType) {
    let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.state.messages.map(m => <Message message={m.message} id={m.id}/>)
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs