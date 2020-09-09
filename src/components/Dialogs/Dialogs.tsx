import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DispatchActionsType, StateDialogsPageType,} from "../../redux/state";
import {addMessageActionCreator, updateMessageActionCreator} from "../../redux/DialogsPageReducer";

type DialogsPropsType = {
    dialogsPage: StateDialogsPageType
    dispatch: (action: DispatchActionsType) => void
}

function Dialogs(props: DialogsPropsType) {

    let newMessage = React.createRef<HTMLTextAreaElement>()

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} id={m.id}/>)

    const sendMessageHandler = () => {
        props.dispatch(addMessageActionCreator())
    }

    const newMessageTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateMessageActionCreator(e.currentTarget.value))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <textarea ref={newMessage} value={props.dialogsPage.newMessageText} onChange={newMessageTextHandler}/>
                </div>
                <div>
                    <button onClick={sendMessageHandler}>Send message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs