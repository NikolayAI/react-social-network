import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    StateUsersObjectPageType,
    toggleIsFetchingAC,
    unfollowAC,
    UsersPageObjectsType
} from "../../redux/UsersPageReducer";
import axios from "axios";
import {Preloader} from "../common/Preloader/Preloader";

type mapStateToProps = {
    users: UsersPageObjectsType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
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
}

export class UsersContainerToo extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.toggleIsFetchingAC(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetchingAC(false)
                this.props.setUsersAC(response.data.items)
                this.props.setTotalUsersCountAC(response.data.totalCount)
            })
    }

    setCurrentPageHandler = (page: number) => {
        this.props.setCurrentPageAC(page)
        this.props.toggleIsFetchingAC(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetchingAC(false)
                this.props.setUsersAC(response.data.items)
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
                       followHandler={this.props.followAC}
                       unfollowHandler={this.props.unfollowAC}/>
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
    }
}

const mapDispatchToProps= {
    followAC,
    unfollowAC,
    setUsersAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    toggleIsFetchingAC,
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainerToo)