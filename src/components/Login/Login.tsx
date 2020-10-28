import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, InputElement} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import style from './../common/FormsControl/FormsControl.module.css'
import {RootStateType} from "../../redux/reduxStore";

type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
type LoginFormDataKeysType = Extract<keyof LoginFormDataType, string>

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = ({login, isAuth, captchaUrl}) => {

    const onSubmit = (formData: LoginFormDataType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
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

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

const MapDispatchToProps: MapDispatchToPropsType = {
    login,
}

export default connect(mapStateToProps, MapDispatchToProps)(Login)