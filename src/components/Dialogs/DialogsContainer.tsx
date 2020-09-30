import React from "react";
import {addMessageActionCreator, updateMessageActionCreator} from "../../redux/DialogsPageReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {DispatchActionsType, StateDialogsPageType, StateObjectType} from "../../redux/store";

type MapStateToPropsType = {
    dialogsPage: StateDialogsPageType
}

const mapStateToProps = (state: StateObjectType): MapStateToPropsType => {
    return {dialogsPage: state.dialogsPage}
}

const mapDispatchToProps = {
    addMessageActionCreator,
    updateMessageActionCreator,
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)


export default DialogsContainer