import React from "react";
import {
    addPostActionCreator,
    ActionsProfilePageType,
    StateProfileObjectPageType,
    StateProfilePagePostsItemType,
    updatePostActionCreator
} from "../../../redux/ProfilePageReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

type MapStateToPropsType = {
    posts: StateProfilePagePostsItemType[]
    newPostText: string
}

type MapDispatchToPropsType = {
    addPostHandler: () => void
    newPostTextHandler: (text: string) => void
}

const mapStateToProps = (state: StateProfileObjectPageType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch: (action: ActionsProfilePageType) => void): MapDispatchToPropsType => {
    return {
        addPostHandler:() => dispatch(addPostActionCreator()),
        newPostTextHandler: (text: string) => dispatch(updatePostActionCreator(text))
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer