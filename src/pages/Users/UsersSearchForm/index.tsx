import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useCallback } from 'react'
import { UsersPageFilterType } from '../../../redux/reducers/usersPageReducer'
import { useSelector } from 'react-redux'
import { selectUsersFilter } from '../../../redux/selectors/usersSelectors'

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

export const UsersSearchForm: React.FC<UsersSearchFormPropsType> = React.memo(
  ({ onFilterChanged }) => {
    const filter = useSelector(selectUsersFilter)

    const handleSubmit = useCallback(
      (
        values: UsersSearchFormFormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
      ) => {
        const filter: UsersPageFilterType = {
          term: values.term,
          friend:
            values.friend === 'null'
              ? null
              : values.friend === 'true'
              ? true
              : false,
        }
        onFilterChanged(filter)
        setSubmitting(false)
      },
      [onFilterChanged]
    )

    return (
      <Formik
        enableReinitialize
        initialValues={{
          term: filter.term,
          friend: (filter.friend as unknown) as UsersSearchFormFriendType,
        }}
        validate={usersSearchFormValidate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='search-bar'>
              <Field type='text' name='term' />
            </div>
            <Field name='friend' as='select' style={{ margin: 10 }}>
              <option value='null'>All</option>
              <option value='true'>Only followed</option>
              <option value='false'>Only unfollowed</option>
            </Field>
            <ErrorMessage name='term' component='div' />
            <button
              className='status-share status-share-logout-button'
              type='submit'
              disabled={isSubmitting}
            >
              Find
            </button>
          </Form>
        )}
      </Formik>
    )
  }
)
