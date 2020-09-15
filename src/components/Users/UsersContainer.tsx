import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {DispatchActionsType} from "../../redux/store";
import {
    followAC,
    setUsersAC,
    StateUsersObjectPageType,
    unfollowAC,
    UsersPageObjectsType
} from "../../redux/UsersPageReducer";

type mapStateToProps = {
    usersPage: UsersPageObjectsType[]
}

type mapDispatchToProps = {
    followHandler: (userId: number) => void
    unfollowHandler: (userId: number) => void
    setUsers: (users: UsersPageObjectsType[]) => void

}

const mapStateToProps = (state: StateUsersObjectPageType): mapStateToProps => ({usersPage: state.usersPage.users})
const mapDispatchToProps = (dispatch: (action: DispatchActionsType) => void): mapDispatchToProps => {
    return {
        followHandler: (userId) => dispatch(followAC(userId)),
        unfollowHandler: (userId) => dispatch(unfollowAC(userId)),
        setUsers: (users) => dispatch(setUsersAC(users))
    }
}


export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)