import React from "react";
import {
    ActionsProfilePageType,
    addPostAC,
    StateProfileObjectPageType, StateProfilePagePostsItemType
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
        addPostHandler:(text: string) => dispatch(addPostAC(text)),
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer