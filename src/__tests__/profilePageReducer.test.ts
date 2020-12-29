import {
    profileActions,
    profilePageReducer,
    StateProfilePageType,
} from '../redux/reducers/profilePageReducer'
import { ResponseContactsType, ResponsePhotosType } from '../api/api'

const state: StateProfilePageType = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 23 },
        { id: 3, message: 'Blabla', likesCount: 5 },
        { id: 4, message: 'Dada', likesCount: 7 },
    ],
    profile: {
        fullName: null,
        lookingForAJob: null,
        lookingForAJobDescription: null,
        aboutMe: null,
        contacts: {
            facebook: null,
            website: null,
            vk: null,
            twitter: null,
            instagram: null,
            youtube: null,
            github: null,
            mainLink: null,
        } as ResponseContactsType,
        userId: null,
        photos: {
            small: undefined,
            large: undefined,
        } as ResponsePhotosType,
    },
    status: '',
}

it('length of posts should be incremented', () => {
    const action = profileActions.addPost('hello there')

    let newState = profilePageReducer(state, action)

    expect(newState.posts.length).toBe(5)
})

it('message of new post should be correct', () => {
    const action = profileActions.addPost('hello there')

    let newState = profilePageReducer(state, action)

    expect(newState.posts[4].message).toBe('hello there')
})

it('after deleting length of messages should be decrement', () => {
    const action = profileActions.deletePost(1)

    let newState = profilePageReducer(state, action)

    expect(newState.posts.length).toBe(3)
})

it(`after deleting length of messages shouldn't be decrement if id is incorrect`, () => {
    const action = profileActions.deletePost(1000)

    let newState = profilePageReducer(state, action)

    expect(newState.posts.length).toBe(4)
})
