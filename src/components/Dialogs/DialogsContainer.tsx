import React from "react";
import {StoreType,} from "../../redux/store";
import {addMessageActionCreator, updateMessageActionCreator} from "../../redux/DialogsPageReducer";
import Dialogs from "./Dialogs";
import {StoreContext} from "../../StoreContext";

// type DialogsPropsType = {
//     store: StoreType
// }

function DialogsContainer() {


    return (
        <StoreContext.Consumer>
            {store => {

                let state = store.getState()
                const sendMessageHandler = () => store.dispatch(addMessageActionCreator())
                const newMessageTextHandler = (text: string) => {
                    store.dispatch(updateMessageActionCreator(text))
                }
                return (<Dialogs
                        dialogsPage={state.dialogsPage}
                        sendMessageHandler={sendMessageHandler}
                        newMessageTextHandler={newMessageTextHandler}/>
                )
            }}
        </StoreContext.Consumer>
    )
}

export default DialogsContainer