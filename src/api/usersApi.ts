import {GetItemsType, instance, APIResponseType} from "./api";


export const usersAPI = {
    getUsers(pageNumber: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${pageNumber}&count=${pageSize}`)
            .then(res => res.data)
    },
    follow(userID: number = 1) {
        return instance.post<APIResponseType>(`follow/${userID}`, {}).then(res => res.data)
    },
    unfollow(userId: number = 1) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
    },
}