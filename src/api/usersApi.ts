import { GetItemsType, instance, APIResponseType } from './api'

export const usersAPI = {
    getUsers(
        pageNumber: number = 1,
        pageSize: number = 10,
        term: string = '',
        friend: null | boolean = null
    ) {
        return instance
            .get<GetItemsType>(
                `users?page=${pageNumber}&count=${pageSize}&term=${term}${
                    friend === null ? '' : `&friend=${friend}`
                }`
            )
            .then((res) => res.data)
    },
    follow(userID: number = 1) {
        return instance
            .post<APIResponseType>(`follow/${userID}`, {})
            .then((res) => res.data)
    },
    unfollow(userId: number = 1) {
        return instance
            .delete(`follow/${userId}`)
            .then((res) => res.data) as Promise<APIResponseType>
    },
}
