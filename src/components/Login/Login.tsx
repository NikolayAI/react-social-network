import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type FormDataType = {
    loginEmail: string
    password: string
    rememberMe: boolean
}

function Login() {

    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }

    return (
        <>
            <h1>login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

function LoginForm(props: InjectedFormProps<FormDataType>) {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div><Field placeholder={'Login/EMail'} component={'input'} name={'loginEmail'}/></div>
                <div><Field placeholder={'Password'} component={'input'} name={'password'}/></div>
                <div><Field type={'checkbox'} component={'input'} name={'rememberMe'}/>remember me</div>
                <div><button>Login</button></div>
            </form>
        </>
    )
}

export default Login