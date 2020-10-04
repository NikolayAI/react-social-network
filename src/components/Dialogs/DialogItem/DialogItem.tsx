import s from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import { StateDialogsPageDialogsItemType } from "../../../redux/dialogsPageReducer";

type DialogItemPropsType = StateDialogsPageDialogsItemType

function DialogItem(props: DialogItemPropsType) {
    let path = '/dialogs/' + props.id
    return (
        <div className={s.dialog}><NavLink to={path} activeClassName={s.active}>{props.name}</NavLink></div>
    )
}

export default DialogItem