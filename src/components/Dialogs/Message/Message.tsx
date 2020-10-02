import s from "../Dialogs.module.css";
import React from "react";
import {StateDialogsPageMessagesItemType} from "../../../redux/DialogsPageReducer";

export type MessagePropsType = StateDialogsPageMessagesItemType

function Message(props: MessagePropsType) {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export default Message