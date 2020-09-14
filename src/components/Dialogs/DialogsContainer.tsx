import React from "react";
import {addMessageActionCreator, updateMessageActionCreator} from "../../redux/DialogsPageReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {DispatchActionsType, StateDialogsPageType, StateObjectType} from "../../redux/store";

type MapStateToPropsType = {
    dialogsPage: StateDialogsPageType
}

type MapDispatchToPropsType = {
    sendMessageHandler: () => void
    newMessageTextHandler: (text: string) => void
}

const mapStateToProps = (state: StateObjectType): MapStateToPropsType => {
    return {dialogsPage: state.dialogsPage}
}

const mapDispatchToProps = (dispatch: (action: DispatchActionsType) => void): MapDispatchToPropsType => {
    return {
        sendMessageHandler: () => dispatch(addMessageActionCreator()),
        newMessageTextHandler: (text: string) => dispatch(updateMessageActionCreator(text)),
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)


export default DialogsContainer