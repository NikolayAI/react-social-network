import React from "react"
import {
    profileActions,
    StateProfileObjectPageType,
    StateProfilePagePostsItemType
} from "../../../redux/profilePageReducer"
import MyPosts from "./MyPosts"
import {connect} from "react-redux"
import {GlobalStateType} from "../../../redux/reduxStore"


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
const mapDispatchToProps: MapDispatchToPropsType = {
    addPostHandler: profileActions.addPostAC,
}


const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, GlobalStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer