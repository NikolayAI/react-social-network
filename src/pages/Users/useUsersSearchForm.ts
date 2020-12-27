import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
    selectCurrentPage,
    selectFollowingInProgress,
    selectIsFetching,
    selectPageSize,
    selectTotalUsersCount,
    selectUsers,
    selectUsersFilter,
} from '../../redux/selectors/usersSelectors'
import {
    follow,
    requestUsers,
    unfollow,
    UsersPageFilterType,
} from '../../redux/reducers/usersPageReducer'
import { useCallback, useEffect } from 'react'
import queryString from 'querystring'

type QueryParamsType = { term?: string; page?: string; friend?: string }

export const useUsersSearchForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const users = useSelector(selectUsers)
    const totalUsersCount = useSelector(selectTotalUsersCount)
    const currentPage = useSelector(selectCurrentPage)
    const pageSize = useSelector(selectPageSize)
    const filter = useSelector(selectUsersFilter)
    const followingInProgress = useSelector(selectFollowingInProgress)
    const isFetching = useSelector(selectIsFetching)

    const handleSetCurrentPage = useCallback(
        (page: number) => {
            dispatch(requestUsers(page, pageSize, filter))
        },
        [dispatch, pageSize, filter]
    )

    const handleFilterChanged = useCallback(
        (filter: UsersPageFilterType) => dispatch(requestUsers(1, pageSize, filter)),
        [dispatch, pageSize]
    )

    const handleFollow = useCallback((userId: number) => dispatch(follow(userId)), [
        dispatch,
    ])

    const handleUnfollow = useCallback((userId: number) => dispatch(unfollow(userId)), [
        dispatch,
    ])

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as {
            term: string
            page: string
            friend: string
        }

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term }
        switch (parsed.friend) {
            case 'null':
                actualFilter = { ...actualFilter, friend: null }
                break
            case 'true':
                actualFilter = { ...actualFilter, friend: true }
                break
            case 'false':
                actualFilter = { ...actualFilter, friend: false }
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
            search: queryString.stringify(query),
            // `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [])

    return {
        isFetching,
        handleFilterChanged,
        totalUsersCount,
        pageSize,
        currentPage,
        handleSetCurrentPage,
        users,
        handleFollow,
        handleUnfollow,
        followingInProgress,
    }
}
