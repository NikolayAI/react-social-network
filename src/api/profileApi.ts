import {ResponsePhotosType, ResponseProfileType} from "../types/types";
import {instance, APIResponseType} from "./api";

export type SavePhotoResponseDataType = {
    photos: ResponsePhotosType
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<ResponseProfileType>(`profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number | null) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status/`, {status: status}).then(res => res.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ResponseProfileType) {
        return instance.put<APIResponseType>(`profile/`, profile).then(res => res.data)
    }
}