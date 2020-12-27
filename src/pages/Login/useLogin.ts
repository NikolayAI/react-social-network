import { useDispatch, useSelector } from 'react-redux'
import { selectCaptchaUrl, selectIsAuth } from '../../redux/selectors/authSelectors'
import { useCallback } from 'react'
import { login } from '../../redux/reducers/authReducer'

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
export const useLogin = () => {
    const dispatch = useDispatch()
    const captchaUrl = useSelector(selectCaptchaUrl)
    const isAuth = useSelector(selectIsAuth)

    const handleSubmit = useCallback(
        (formData: LoginFormDataType) => {
            dispatch(
                login(
                    formData.email,
                    formData.password,
                    formData.rememberMe,
                    formData.captcha
                )
            )
        },
        [dispatch]
    )

    return { isAuth, handleSubmit, captchaUrl }
}
