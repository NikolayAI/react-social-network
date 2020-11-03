import React from "react"
import {InjectedFormProps, reduxForm} from "redux-form"
import {createField, GetStringKeys, InputElement} from "../common/FormsControl/FormsControl"
import {required} from "../../utils/validators/validators"
import {useDispatch, useSelector} from "react-redux"
import {login} from "../../redux/authReducer"
import {Redirect} from "react-router-dom"
import style from './../common/FormsControl/FormsControl.module.css'
import {GlobalStateType} from "../../redux/reduxStore"


export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

type LoginPropsType = {}


export const LoginPage: React.FC<LoginPropsType> = () => {

    const dispatch = useDispatch()
    const captchaUrl = useSelector((state: GlobalStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: GlobalStateType) => state.auth.isAuth)


    const onSubmit = (formData: LoginFormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }


    if (isAuth) return <Redirect to={'/profile/'}/>

    return (
        <>
            <h1>login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </>
    )
}


type LoginFormPropsType = {
    captchaUrl: string | null
}

type LoginFormDataKeysType = GetStringKeys<LoginFormDataType>


const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormPropsType> & LoginFormPropsType> = ({error, handleSubmit,
                                                                                            captchaUrl}) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                {createField<LoginFormDataKeysType>('email', 'email', [required], InputElement)}
                {createField<LoginFormDataKeysType>('password', 'password', [required], InputElement, {type: 'password'})}
                {createField<LoginFormDataKeysType>(undefined, 'rememberMe', [], InputElement, {type: 'checkbox'}, 'remember me')}
                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && createField<LoginFormDataKeysType>('Value from the image', 'captcha', [required], InputElement)}
                {error && <div className={style.formSummaryError}>{error}</div>}
                <div><button>Login</button></div>
            </form>
        </>
    )
}

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormPropsType>({form: 'login'})(LoginForm)