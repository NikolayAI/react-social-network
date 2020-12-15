import s from '../index.module.css'
import React from 'react'
import { StateDialogsPageMessagesItemType } from '../../../redux/reducers/dialogsPageReducer'

export type MessagePropsType = StateDialogsPageMessagesItemType

export const Dialog: React.FC<MessagePropsType> = ({ message }) => (
    <div className={s.message}>{message}</div>
)
