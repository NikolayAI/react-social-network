import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    StateUsersObjectPageType,
    toggleIsFetchingAC, toggleFollowingProgressAC,
    unfollowAC,
    UsersPageObjectsType
} from "../../redux/usersPageReducer";
import {Preloader} from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

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
    followAC: (userId: number) => void
    unfollowAC: (userId: number) => void
    setUsersAC: (users: UsersPageObjectsType[]) => void
    setCurrentPageAC: (page: number) => void
    setTotalUsersCountAC: (usersCount: number) => void
    toggleIsFetchingAC: (isFetching: boolean) => void
    toggleFollowingProgressAC: (followingInProgress: boolean, userId: number) => void
    followingInProgress: number[]
}

export class UsersContainerToo extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.toggleIsFetchingAC(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetchingAC(false)
                this.props.setUsersAC(data.items)
                this.props.setTotalUsersCountAC(data.totalCount)
            })
    }

    setCurrentPageHandler = (page: number) => {
        this.props.setCurrentPageAC(page)
        this.props.toggleIsFetchingAC(true)
        usersAPI.getUsers(page, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetchingAC(false)
                this.props.setUsersAC(data.items)
            })
    }

    render() {
        return (<>
                {this.props.isFetching ? <Preloader/> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       setCurrentPageHandler={this.setCurrentPageHandler}
                       users={this.props.users}
                       follow={this.props.followAC}
                       unfollow={this.props.unfollowAC}
                       toggleFollowingProgressAC={this.props.toggleFollowingProgressAC}
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
    followAC,
    unfollowAC,
    setUsersAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    toggleIsFetchingAC,
    toggleFollowingProgressAC,
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainerToo)