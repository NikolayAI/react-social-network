import React from "react";
import {addPostActionCreator, updatePostActionCreator} from "../../../redux/ProfilePageReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {DispatchActionsType, StateObjectType, StateProfilePagePostsItemType} from "../../../redux/store";

type MapStateToPropsType = {
    posts: StateProfilePagePostsItemType[]
    newPostText: string
}

type MapDispatchToPropsType = {
    addPostHandler: () => void
    newPostTextHandler: (text: string) => void
}

const mapStateToProps = (state: StateObjectType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch: (action: DispatchActionsType) => void): MapDispatchToPropsType => {
    return {
        addPostHandler:() => dispatch(addPostActionCreator()),
        newPostTextHandler: (text: string) => dispatch(updatePostActionCreator(text))
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer