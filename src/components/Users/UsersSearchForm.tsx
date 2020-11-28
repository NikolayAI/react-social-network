import {ErrorMessage, Field, Form, Formik} from 'formik'
import React from 'react'
import {UsersPageFilterType} from '../../redux/usersPageReducer'
import {useSelector} from 'react-redux'
import {getUsersFilter} from '../../redux/users-selectors'


type ForFormAnyType = {
    name: string
    id: number
}


const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type UsersSearchFormPropsType = {
    onFilterChanged: (filter: UsersPageFilterType) => void
}

type UsersSearchFormFriendType = 'true' | 'false' | 'null'

type UsersSearchFormFormType = {
    term: string
    friend: UsersSearchFormFriendType
}


export const UsersSearchForm: React.FC<UsersSearchFormPropsType> = ({onFilterChanged}) => {
    const filter = useSelector(getUsersFilter)


    const submit = (values: UsersSearchFormFormType,
                    {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: UsersPageFilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    return <Formik
        enableReinitialize
        initialValues={{term: filter.term, friend: filter.friend as unknown as UsersSearchFormFriendType}}
        validate={usersSearchFormValidate}
        onSubmit={submit}
    >
        {({isSubmitting}) => (
            <Form>
                <Field type="text" name="term"/>
                <Field name="friend" as="select">
                    <option value="null">All</option>
                    <option value="true">Only followed</option>
                    <option value="false">Only unfollowed</option>
                </Field>
                <ErrorMessage name="term" component="div"/>
                <button type="submit" disabled={isSubmitting}>
                    Find
                </button>
            </Form>
        )}
    </Formik>
}