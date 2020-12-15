import s from '../index.module.css'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { StateDialogsPageDialogsItemType } from '../../../redux/reducers/dialogsPageReducer'

type DialogItemPropsType = StateDialogsPageDialogsItemType

export const DialogItem: React.FC<DialogItemPropsType> = ({ id, name }) => {
    let path = '/dialogs/' + id

    return (
        <div className={s.dialog}>
            <NavLink to={path} activeClassName={s.active}>
                {name}
            </NavLink>
        </div>
    )
}
