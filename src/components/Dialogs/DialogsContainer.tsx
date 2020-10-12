import React from "react";
import {
    addMessageActionCreator,
    StateDialogsObjectPageType,
    StateDialogsPageType,
    updateMessageActionCreator
} from "../../redux/dialogsPageReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {StateAuthObjectType} from "../../redux/authReducer";

type MapStateToPropsType = {
    dialogsPage: StateDialogsPageType
    isAuth: boolean
}

type MapStateToPropsStateMergeType = StateDialogsObjectPageType & StateAuthObjectType

const mapStateToProps = (state: MapStateToPropsStateMergeType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth,
    }
}

const mapDispatchToProps = {
    addMessageActionCreator,
    updateMessageActionCreator,
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)


export default DialogsContainer