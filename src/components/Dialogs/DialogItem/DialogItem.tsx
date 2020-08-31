import s from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

export type DialogItemType = {
    id: number
    name: string
}

function DialogItem(props: DialogItemType) {
    let path = '/dialogs/' + props.id
    return (
        <div className={s.dialog}><NavLink to={path} activeClassName={s.active}>{props.name}</NavLink></div>
    )
}

export default DialogItem