import { createSelector } from 'reselect'
import { RootStateType } from '../reducers/rootReducer1'

const getProfile = (state: RootStateType) => state.profilePage.profile
export const selectProfile = createSelector(getProfile, (profile) => profile)

const getPosts = (state: RootStateType) => state.profilePage.posts
export const selectPosts = createSelector(getPosts, (posts) => posts)

export const selectUserId = createSelector(
  getProfile,
  (profile) => profile.userId
)

export const selectProfileStatus = (state: RootStateType) =>
  state.profilePage.status
export const selectSmallPhoto = (state: RootStateType) =>
  state.profilePage.profile.photos.small
