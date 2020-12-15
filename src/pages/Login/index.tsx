import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, GetStringKeys, InputElement } from '../../components/FormsControl'
import { required } from '../../utils/validators/validators'
import { Redirect } from 'react-router-dom'
import style from '../../components/FormsControl/index.module.css'
import { LoginFormDataType, useLogin } from './useLogin'

export const Login: React.FC = () => {
    const { isAuth, handleSubmit, captchaUrl } = useLogin()

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
    InjectedFormProps<LoginFormDataType, LoginFormPropsType> & LoginFormPropsType
> = React.memo(({ error, handleSubmit, captchaUrl }) => {
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
})

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormPropsType>({
    form: 'login',
})(LoginForm)
