import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import {
    createField,
    GetStringKeys,
    InputElement,
} from '../../components/FormsControl'
import { required } from '../../utils/validators/validators'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../reducers/authReducer'
import { Redirect } from 'react-router-dom'
import style from '../../components/FormsControl/index.module.css'
import { RootStateType } from '../../reducers/reduxStore'
import { getCaptchaUrl, getIsAuth } from '../../selectors/authSelectors'

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

export const Login: React.FC = () => {
    const dispatch = useDispatch()
    const captchaUrl = useSelector(getCaptchaUrl)
    const isAuth = useSelector(getIsAuth)

    const handleSubmit = (formData: LoginFormDataType) => {
        dispatch(
            login(
                formData.email,
                formData.password,
                formData.rememberMe,
                formData.captcha
            )
        )
    }

    if (isAuth) return <Redirect to={'/profile/'} />

    return (
        <>
            <h1>login</h1>
            <LoginReduxForm onSubmit={handleSubmit} captchaUrl={captchaUrl} />
        </>
    )
}

type LoginFormPropsType = {
    captchaUrl: string | null
}

type LoginFormDataKeysType = GetStringKeys<LoginFormDataType>

const LoginForm: React.FC<
    InjectedFormProps<LoginFormDataType, LoginFormPropsType> &
        LoginFormPropsType
> = ({ error, handleSubmit, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormDataKeysType>(
                'email',
                'email',
                [required],
                InputElement
            )}
            {createField<LoginFormDataKeysType>(
                'password',
                'password',
                [required],
                InputElement,
                { type: 'password' }
            )}
            {createField<LoginFormDataKeysType>(
                undefined,
                'rememberMe',
                [],
                InputElement,
                { type: 'checkbox' },
                'remember me'
            )}
            {captchaUrl && <img src={captchaUrl} alt={'captcha'} />}
            {captchaUrl &&
                createField<LoginFormDataKeysType>(
                    'Value from the image',
                    'captcha',
                    [required],
                    InputElement
                )}
            {error && <div className={style.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormPropsType>({
    form: 'login',
})(LoginForm)
