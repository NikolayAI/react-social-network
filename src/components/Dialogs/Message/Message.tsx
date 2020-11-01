import s from "../Dialogs.module.css";
import React from "react";
import {StateDialogsPageMessagesItemType} from "../../../redux/dialogsPageReducer";

export type MessagePropsType = StateDialogsPageMessagesItemType

const Message: React.FC<MessagePropsType> = (props) => {
    return <div className={s.message}>{props.message}</div>
}

export default Message