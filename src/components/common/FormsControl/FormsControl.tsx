import React from "react";
import styles from './FormsControl.module.css'
import {Field} from "redux-form";

export const Element = (Elem: string) => ({input, meta: {touched, error}, ...props}: any) => {
    const hasError = touched && error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <Elem {...input} {...props}/>
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    )
}

export const createField = (placeholder: string | null, name: string, validators: any, component: React.FC, props: any = {}, text: string = '') => (
    <div>
        <Field
            placeholder={placeholder}
            name={name}
            validate={validators}
            component={component}
            {...props}
        /> {text}
    </div>
)
export const InputElement = Element('input')
export const TextareaElement = Element('textarea')