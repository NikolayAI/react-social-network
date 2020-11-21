import React from "react"
import {dialogsActions, StateDialogsPageType} from "../../redux/dialogsPageReducer"
import Dialogs from "./Dialogs"
import {connect} from "react-redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux"
import {GlobalStateType} from "../../redux/reduxStore"


type MapStateToPropsType = {
    dialogsPage: StateDialogsPageType
}

const mapStateToProps = (state: GlobalStateType): MapStateToPropsType => {
    return {dialogsPage: state.dialogsPage,}
}


const mapDispatchToProps = {
    addMessageAC: dialogsActions.addMessageAC,
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)
(Dialogs)