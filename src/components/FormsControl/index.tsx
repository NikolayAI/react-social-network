import React from 'react'
import styles from './index.module.css'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../../utils/validators/validators'

type ElementParamsType = {
    input: any
    meta: WrappedFieldMetaProps
    props: WrappedFieldProps
}

export const Element = (Elem: string) =>
    React.memo(({ input, meta: { touched, error }, ...props }: ElementParamsType) => {
        const hasError = touched && error

        return (
            <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
                <Elem {...input} {...props} />
                <div>{hasError && <span>{error}</span>}</div>
            </div>
        )
    })

export const createField = <FormKeysType extends string>(
    placeholder: string | undefined,
    name: FormKeysType,
    validators: FieldValidatorType[],
    component: string | React.FC<ElementParamsType> | React.Component<ElementParamsType>,
    props: any = {},
    text = ''
) => {
    return (
        <div>
            <Field
                placeholder={placeholder}
                name={name}
                validate={validators}
                component={component}
                {...props}
            />{' '}
            {text}
        </div>
    )
}

export type GetStringKeys<T> = Extract<keyof T, string>

export const InputElement = Element('input')
export const TextareaElement = Element('textarea')
