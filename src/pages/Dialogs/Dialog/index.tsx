import s from '../index.module.css'
import React from 'react'
import { StateDialogsPageMessagesItemType } from '../../../reducers/dialogsPageReducer'

export type MessagePropsType = StateDialogsPageMessagesItemType

export const Dialog: React.FC<MessagePropsType> = (props) => (
    <div className={s.message}>{props.message}</div>
)
