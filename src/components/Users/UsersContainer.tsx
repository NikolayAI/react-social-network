import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {follow, requestUsers, unfollow} from "../../redux/usersPageReducer";
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
import {ResponseUserType} from "../../types/types";
import {GlobalStateType} from "../../redux/reduxStore";

type mapStateToProps = {
    users: Array<ResponseUserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type mapDispatchToProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
}

type OwnUsersContainerTooPropsType = {}

type UsersContainerTooPropsType = OwnUsersContainerTooPropsType & mapStateToProps & mapDispatchToProps

export class UsersContainerToo extends React.Component<UsersContainerTooPropsType> {

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

const mapStateToProps = (state: GlobalStateType): mapStateToProps => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

const mapDispatchToProps: mapDispatchToProps = {
    follow,
    unfollow,
    requestUsers,
}

export const UsersContainer = compose<React.FC>(
    connect<mapStateToProps, mapDispatchToProps,
        OwnUsersContainerTooPropsType, GlobalStateType>(mapStateToProps, mapDispatchToProps)
)
(UsersContainerToo)