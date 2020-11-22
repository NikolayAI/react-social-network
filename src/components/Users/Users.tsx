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
import {useHistory} from "react-router-dom"
import * as queryString from 'querystring'


type UsersPropsType = {}
type QueryParamsType = { term?: string, page?: string, friend?: string }


export const Users: React.FC<UsersPropsType> = () => {

    const dispatch = useDispatch()
    const history = useHistory()
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
        const parsed = queryString.parse(
            history.location.search.substr(1)
        ) as { term: string, page: string, friend: string }

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term}
        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (!!filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users/',
            search: queryString.stringify(query)
            // `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])

    return (
        <div>
            <div>
                <UsersSearchForm onFilterChanged={onFilterChanged}/>
            </div>
            <Paginator
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                setCurrentPageHandler={setCurrentPageHandler}
                portionSize={10}
            />
            {users.map(u =>
                <User
                    key={u.id}
                    user={u}
                    follow={followHandler}
                    unfollow={unfollowHandler}
                    followingInProgress={followingInProgress}
                />
            )}
        </div>
    )
}