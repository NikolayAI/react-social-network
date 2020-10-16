import axios from "axios";
import {FormDataType} from "../components/Login/Login";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': 'f42d8ba2-6f4b-4b16-a713-ca3fc2cb7707'},
})

export const usersAPI = {
    getUsers(pageNumber: number, pageSize: number) {
        return instance.get(`users?page=${pageNumber}&count=${pageSize}`)
    },
    follow(userID: number = 1) {
        return instance.post(`follow/${userID}`, {})
    },
    unfollow(userId: number = 1) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: number | null){
        return profileAPI.getProfile(userId)
    },
    getProfileSmallPhoto(userId: number | null) {
        return instance.get(`profile/${userId}`)
    }
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number | null) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(formData: FormDataType) {
        return instance.post(`auth/login`, formData)
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}

