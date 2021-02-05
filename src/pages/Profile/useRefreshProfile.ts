import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {
  getUserProfile,
  getUserStatus,
} from '../../redux/reducers/profilePageReducer'
import { useCallback, useEffect } from 'react'
import { selectAuthorizedUserId } from '../../redux/selectors/authSelectors'

export const useRefreshProfile = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const authorizedUserId = useSelector(selectAuthorizedUserId)
  let { userId = authorizedUserId } = useParams()

  const refreshProfile = useCallback(
    (userId: number | null) => {
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
    },
    [dispatch, history, authorizedUserId]
  )

  useEffect(() => {
    refreshProfile(Number(userId))
  }, [refreshProfile, userId])

  return {
    userId,
    authorizedUserId,
  }
}
