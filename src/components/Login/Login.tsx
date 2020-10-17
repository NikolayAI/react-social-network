import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Element} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login, StateAuthObjectType} from "../../redux/authReducer";
import { Redirect } from "react-router-dom";

export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}

function Login(props: LoginPropsType) {

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) return <Redirect to={'/profile/'}/>

    return (
        <>
            <h1>login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const InputElement = Element('input')

function LoginForm(props: InjectedFormProps<FormDataType>) {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div><Field placeholder={'email'} component={InputElement} name={'email'} validate={[required]}/></div>
                <div><Field placeholder={'Password'} component={InputElement} name={'password'} type={'password'} validate={[required]}/></div>
                <div><Field type={'checkbox'} component={InputElement} name={'rememberMe'} validate={[required]}/>remember me</div>
                <div><button>Login</button></div>
            </form>
        </>
    )
}

type mapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: StateAuthObjectType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)