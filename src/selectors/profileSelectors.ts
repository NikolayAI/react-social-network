import { createSelector } from 'reselect'
import { RootStateType } from '../reducers/reduxStore'

export const getProfileSuperSelector = (state: RootStateType) =>
    state.profilePage.profile
export const getProfile = createSelector(
    getProfileSuperSelector,
    (profile) => profile
)

export const getPostsSuperSelector = (state: RootStateType) =>
    state.profilePage.posts
export const getPosts = createSelector(getPostsSuperSelector, (posts) => posts)

export const getProfileStatus = (state: RootStateType) =>
    state.profilePage.status
export const getSmallPhoto = (state: RootStateType) =>
    state.profilePage.profile.photos.small
