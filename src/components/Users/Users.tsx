import React, {useEffect} from "react"
import {Paginator} from "../common/Paginator/Paginator"
import User from "./User"
import {UsersSearchForm} from './UsersSearchForm'
import {follow, requestUsers, unfollow, UsersPageFilterType} from '../../redux/usersPageReducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors'


type UsersPropsType = {}


export const Users: React.FC<UsersPropsType> = () => {

    const dispatch = useDispatch()
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)


    const setCurrentPageHandler = (page: number) => dispatch(requestUsers(page, pageSize, filter))
    const onFilterChanged = (filter: UsersPageFilterType) => dispatch(requestUsers(1, pageSize, filter))
    const followHandler = (userId: number) => dispatch(follow(userId))
    const unfollowHandler = (userId: number) => dispatch(unfollow(userId))


    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    return (
        <div>
            <div>
                <UsersSearchForm onFilterChanged={onFilterChanged}/>
            </div>
            <Paginator totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       currentPage={currentPage}
                       setCurrentPageHandler={setCurrentPageHandler}
                       portionSize={10}
            />
            {users.map(u => <User key={u.id}
                                  user={u}
                                  follow={followHandler}
                                  unfollow={unfollowHandler}
                                  followingInProgress={followingInProgress}
                />
            )}
        </div>
    )
}