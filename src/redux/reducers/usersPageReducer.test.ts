import {
  StateUsersPageType,
  usersPageActions,
  usersPageReducer,
} from './usersPageReducer'

let state: StateUsersPageType

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: 'Niko 0',
        followed: false,
        photos: { small: undefined, large: undefined },
        status: 'status 0',
        uniqueUrlName: '',
      },
      {
        id: 1,
        name: 'Niko 1',
        followed: false,
        photos: { small: undefined, large: undefined },
        status: 'status 1',
        uniqueUrlName: '',
      },
      {
        id: 2,
        name: 'Niko 2',
        followed: true,
        photos: { small: undefined, large: undefined },
        status: 'status 2',
        uniqueUrlName: '',
      },
      {
        id: 3,
        name: 'Niko 3',
        followed: true,
        photos: { small: undefined, large: undefined },
        status: 'status 3',
        uniqueUrlName: '',
      },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [], // array of users id
    filter: {
      term: '',
      friend: null as null | boolean,
    },
  }
})

test('follow success', () => {
  const newState = usersPageReducer(state, usersPageActions.follow(1))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
  const newState = usersPageReducer(state, usersPageActions.unfollow(3))

  expect(newState.users[2].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeFalsy()
})
