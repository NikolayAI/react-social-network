import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Element} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login, StateAuthObjectType} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import style from './../common/FormsControl/FormsControl.module.css'

export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}

const Login: React.FC<LoginPropsType> = ({login, isAuth}) => {

    const onSubmit = (formData: FormDataType) => {
        login(formData.email, formData.password, formData.rememberMe)
    }

    if (isAuth) return <Redirect to={'/profile/'}/>

    return (
        <>
            <h1>login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </>
    )
}

const InputElement = Element('input')

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({error, handleSubmit}) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                {createField('email', 'email', [required], InputElement)}
                {createField('password', 'password', [required], InputElement, {type: 'password'})}
                {createField(null, 'rememberMe', [], InputElement, {type: 'checkbox'}, 'remember me')}
                {error && <div className={style.formSummaryError}>{error}</div>}
                <div><button>Login</button></div>
            </form>
        </>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

type mapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: StateAuthObjectType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)