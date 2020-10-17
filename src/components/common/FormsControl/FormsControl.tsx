import React from "react";
import styles from './FormsControl.module.css'

export const Element = (Elem: string) => ({input, meta, ...props}: any) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <Elem {...input} {...props}/>
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}