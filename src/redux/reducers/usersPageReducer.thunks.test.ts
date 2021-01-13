import { usersAPI } from '../../api/usersApi'
import { APIResponseType, ResultCodes } from '../../api/api'
import { follow, unfollow, usersPageActions } from './usersPageReducer'

jest.mock('../../api/usersApi')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

afterEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
  userAPIMock.follow.mockClear()
  userAPIMock.unfollow.mockClear()
})

const result: APIResponseType = {
  resultCode: ResultCodes.Success,
  messages: [],
  data: {},
}

userAPIMock.follow.mockReturnValue(Promise.resolve(result))
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

test('success follow thunk', async () => {
  const thunk = follow(1)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    usersPageActions.toggleFollowingProgress(true, 1)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(2, usersPageActions.follow(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    usersPageActions.toggleFollowingProgress(false, 1)
  )
})

test('success unfollow thunk', async () => {
  const thunk = unfollow(1)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    usersPageActions.toggleFollowingProgress(true, 1)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(2, usersPageActions.unfollow(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    usersPageActions.toggleFollowingProgress(false, 1)
  )
})
