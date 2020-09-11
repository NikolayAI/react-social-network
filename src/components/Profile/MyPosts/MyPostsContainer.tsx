import React from "react";
import {addPostActionCreator, updatePostActionCreator} from "../../../redux/ProfilePageReducer";
import MyPosts from "./MyPosts";
import {StoreContext} from "../../../StoreContext";

// type MyPostsContainerPropsType = {
//     store: StoreType
// }

function MyPostsContainer() {

    return (
        <StoreContext.Consumer>
            {store => {

                let state = store.getState()
                const addPostHandler = () => store.dispatch(addPostActionCreator())
                const newPostTextHandler = (text: string) => store.dispatch(updatePostActionCreator(text))

                return (<MyPosts posts={state.profilePage.posts}
                                 addPostHandler={addPostHandler}
                                 newPostTextHandler={newPostTextHandler}
                                 newPostText={state.profilePage.newPostText}/>
                                 )
            }
            }
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer