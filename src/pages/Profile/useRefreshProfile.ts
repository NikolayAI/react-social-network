import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { RootStateType } from '../../reducers/reduxStore'
import {
    getUserProfile,
    getUserStatus,
    savePhoto,
    saveProfile,
} from '../../reducers/profilePageReducer'
import { useEffect } from 'react'
import { getAuthorizedUserId } from '../../selectors/authSelectors'

export const useRefreshProfile = () => {
    const dispatch = useDispatch()
    let { userId } = useParams()
    const history = useHistory()
    const authorizedUserId = useSelector(getAuthorizedUserId)

    const refreshProfile = () => {
        // const urlParams = new URLSearchParams(window.location.search);
        // const id = urlParams.get('id');
        if (!userId) {
            userId = authorizedUserId
            if (!userId) return history.push('/login/')
        }
        if (!userId) {
            throw new Error(
                'ID should exists in URI params or in state("authorizedUserId")'
            )
        } else {
            dispatch(getUserProfile(userId))
            dispatch(getUserStatus(userId))
        }
    }

    useEffect(() => {
        refreshProfile()
    }, [userId])

    return {
        userId,
        savePhoto,
        saveProfile,
        authorizedUserId,
    }
}
