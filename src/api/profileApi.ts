import {ResponsePhotosType, ResponseProfileType} from "../types/types";
import {instance} from "./api";

export type SavePhotoResponseDataType = {
    photos: ResponsePhotosType
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<ResponseProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number | null) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ResponseProfileType) {
        return instance.put(`profile/`, profile)
    }
}