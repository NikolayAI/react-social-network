import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, InputElement} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login, StateAuthObjectType} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import style from './../common/FormsControl/FormsControl.module.css'

export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
    isAuth: boolean
    captchaUrl: string | null
}

const Login: React.FC<LoginPropsType> = ({login, isAuth, captchaUrl}) => {

    const onSubmit = (formData: FormDataType) => {
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

const LoginForm: React.FC<InjectedFormProps<FormDataType> & any> = ({error, handleSubmit, captchaUrl}) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                {createField('email', 'email', [required], InputElement)}
                {createField('password', 'password', [required], InputElement, {type: 'password'})}
                {createField(null, 'rememberMe', [], InputElement, {type: 'checkbox'}, 'remember me')}
                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && createField('Value from the image', 'captcha', [required], InputElement)}
                {error && <div className={style.formSummaryError}>{error}</div>}
                <div><button>Login</button></div>
            </form>
        </>
    )
}

const LoginReduxForm = reduxForm<FormDataType, any>({form: 'login'})(LoginForm)

type mapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

const mapStateToProps = (state: StateAuthObjectType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

export default connect(mapStateToProps, {login})(Login)