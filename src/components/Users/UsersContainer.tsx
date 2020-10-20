import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {
    follow,
    requestUsers,
    setCurrentPageAC,
    StateUsersObjectPageType,
    unfollow,
    UsersPageObjectsType
} from "../../redux/usersPageReducer";
import {Preloader} from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersSuperSelector
} from "../../redux/users-selectors";

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
    requestUsers: (currentPage: number, pageSize: number) => void
}

export class UsersContainerToo extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    setCurrentPageHandler = (page: number) => {
        this.props.requestUsers(page, this.props.pageSize)
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

// const mapStateToProps = (state: StateUsersObjectPageType): mapStateToProps => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//     }
// }

const mapStateToProps = (state: StateUsersObjectPageType): mapStateToProps => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

const mapDispatchToProps= {
    follow,
    unfollow,
    setCurrentPageAC,
    requestUsers,
}

export const UsersContainer = compose<React.FC>(
    connect(mapStateToProps, mapDispatchToProps)
  )
(UsersContainerToo)