import React from 'react'
import { Paginator } from '../../components/Paginator'
import { User } from './User'
import { UsersSearchForm } from './UsersSearchForm'
import { Preloader } from '../../components/Preloader'
import { useUsersSearchForm } from './useUsersSearchForm'

export const Users: React.FC = React.memo(() => {
  const {
    isFetching,
    handleFilterChanged,
    totalUsersCount,
    pageSize,
    currentPage,
    handleSetCurrentPage,
    users,
    handleFollow,
    handleUnfollow,
    followingInProgress,
  } = useUsersSearchForm()

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <div>
        <div>
          <UsersSearchForm onFilterChanged={handleFilterChanged} />
        </div>
        <Paginator
          totalItemsCount={totalUsersCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onSetCurrentPage={handleSetCurrentPage}
          portionSize={10}
        />
        <div className='side-wrapper contacts'>
          {users.map((u) => (
            <User
              key={u.id}
              user={u}
              onFollow={handleFollow}
              onUnfollow={handleUnfollow}
              followingInProgress={followingInProgress}
            />
          ))}
        </div>
      </div>
    </>
  )
})
