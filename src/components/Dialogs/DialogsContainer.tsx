import React from "react";
import {
    addMessageActionCreator,
    StateDialogsObjectPageType,
    StateDialogsPageType,
    updateMessageActionCreator
} from "../../redux/dialogsPageReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

type MapStateToPropsType = {
    dialogsPage: StateDialogsPageType
}

const mapStateToProps = (state: StateDialogsObjectPageType): MapStateToPropsType => {
    return {dialogsPage: state.dialogsPage}
}

const mapDispatchToProps = {
    addMessageActionCreator,
    updateMessageActionCreator,
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)


export default DialogsContainer