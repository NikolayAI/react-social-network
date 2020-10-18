import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {
    follow,
    getUsers,
    setCurrentPageAC,
    StateUsersObjectPageType,
    unfollow,
    UsersPageObjectsType
} from "../../redux/usersPageReducer";
import {Preloader} from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import { compose } from "redux";

type mapStateToProps = {
    users: UsersPageObjectsType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

type UsersContainerPropsType = {
    users: UsersPageObjectsType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPageAC: (page: number) => void
    followingInProgress: number[]
    getUsers: (currentPage: number, pageSize: number) => void
}

export class UsersContainerToo extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    setCurrentPageHandler = (page: number) => {
        this.props.getUsers(page, this.props.pageSize)
    }

    render() {
        return (<>
                {this.props.isFetching ? <Preloader/> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       setCurrentPageHandler={this.setCurrentPageHandler}
                       users={this.props.users}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       followingInProgress={this.props.followingInProgress}/>
            </>
        )
    }
}

const mapStateToProps = (state: StateUsersObjectPageType): mapStateToProps => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

const mapDispatchToProps= {
    follow,
    unfollow,
    setCurrentPageAC,
    getUsers,
}

export const UsersContainer = compose<React.FC>(
    connect(mapStateToProps, mapDispatchToProps)
  )
(UsersContainerToo)