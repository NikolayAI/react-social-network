import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import {addPost, StateObjectType} from "./redux/state";

export const rerenderEntireTree = (state: StateObjectType) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addPost={addPost}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}