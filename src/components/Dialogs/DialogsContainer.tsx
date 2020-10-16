import React from "react";
import {addMessageAC, StateDialogsObjectPageType, StateDialogsPageType} from "../../redux/dialogsPageReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {StateAuthObjectType} from "../../redux/authReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type MapStateToPropsType = {
    dialogsPage: StateDialogsPageType
}

type MapStateToPropsStateMergeType = StateDialogsObjectPageType & StateAuthObjectType

const mapStateToProps = (state: MapStateToPropsStateMergeType): MapStateToPropsType => {
    return {dialogsPage: state.dialogsPage,}
}

const mapDispatchToProps = {
    addMessageAC,
}

export default compose<React.FC>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)
(Dialogs)