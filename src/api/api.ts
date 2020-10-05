import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': 'f42d8ba2-6f4b-4b16-a713-ca3fc2cb7707'},
})

export const followAPI = {
    unfollow(userId: number = 1) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data.resultCode)},
    follow(userID: number = 1) {
        return instance.post(`follow/${userID}`, {})
            .then(response => response.data.resultCode)
    }
}

export const usersAPI = {
    getUsers(pageNumber: number, pageSize: number) {
        return instance.get(`users?page=${pageNumber}&count=${pageSize}`)
            .then(response => response.data)
    }
}

export const authAPI = {
    getLogin() {
        return instance.get(`auth/me`)
            .then(response => response)
    }
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data.photos.small)
    }
}