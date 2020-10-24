import React from "react";
import {UsersPageObjectsType} from "../../redux/usersPageReducer";
import {Paginator} from "../common/Paginator/Paginator";
import User from "./User";

type UsersPropsType = {
    users: UsersPageObjectsType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPageHandler: (page: number) => void
    followingInProgress: number[]
}

const Users: React.FC<UsersPropsType> = ({totalUsersCount, pageSize, currentPage,
                                             setCurrentPageHandler,...props}) => {
    return (
        <div>
            <Paginator totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       currentPage={currentPage}
                       setCurrentPageHandler={setCurrentPageHandler}
                       portionSize={10}
            />
            {props.users.map(u => <User key={u.id}
                                        user={u}
                                        follow={props.follow}
                                        unfollow={props.unfollow}
                                        followingInProgress={props.followingInProgress}/> )}
        </div>
    )
}

export default Users