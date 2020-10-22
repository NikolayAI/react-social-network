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
    getUsers
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
        const {requestUsers, currentPage, pageSize} = this.props
        requestUsers(currentPage, pageSize)
    }

    setCurrentPageHandler = (page: number) => {
        const {requestUsers, pageSize} = this.props
        requestUsers(page, pageSize)
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
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

const mapDispatchToProps = {
    follow,
    unfollow,
    setCurrentPageAC,
    requestUsers,
}

export const UsersContainer = compose<React.FC>(
    connect(mapStateToProps, mapDispatchToProps)
)
(UsersContainerToo)