import React from "react";
import {
    ActionsProfilePageType,
    addPostActionCreator,
    StateProfileObjectPageType,
    StateProfilePagePostsItemType
} from "../../../redux/profilePageReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

type MapStateToPropsType = {
    posts: StateProfilePagePostsItemType[]
}

type MapDispatchToPropsType = {
    addPostHandler: (text: string) => void
}

const mapStateToProps = (state: StateProfileObjectPageType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
    }
}
const mapDispatchToProps = (dispatch: (action: ActionsProfilePageType) => void): MapDispatchToPropsType => {
    return {
        addPostHandler:(text: string) => dispatch(addPostActionCreator(text)),
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer