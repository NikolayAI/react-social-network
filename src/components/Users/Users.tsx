import React from "react";
import {UsersPageObjectsType} from "../../redux/UsersPageReducer";

type UsersPropsType = {
    usersPage: UsersPageObjectsType[]
    followHandler: (userId: number) => void
    unfollowHandler: (userId: number) => void
    setUsers: (users: UsersPageObjectsType[]) => void
}

function Users(props: UsersPropsType) {

    if (props.usersPage.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSVdSZiirXtyx85jKUHoHFKPjFdC9FtX1sP3w&usqp=CAU',
                followed: false,
                fullName: 'Dmitriy',
                status: 'I am a boss',
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 2,
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSVdSZiirXtyx85jKUHoHFKPjFdC9FtX1sP3w&usqp=CAU',
                followed: true,
                fullName: 'Sasha',
                status: 'I am a boss too',
                location: {city: 'Moscow', country: 'Russia'}
            },
            {
                id: 3,
                photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSVdSZiirXtyx85jKUHoHFKPjFdC9FtX1sP3w&usqp=CAU',
                followed: false,
                fullName: 'Andrew',
                status: 'I am also a boss',
                location: {city: 'Kiev', country: 'Ukraine'}
            },
        ])
    }
    return (
        <div>
            {props.usersPage.map(u => <div key={u.id}>
                <span>
                    <div><img style={{width: '5vw'}} src={u.photoUrl}/></div>
                    <div>
                        {u.followed
                            ? <button onClick={() => props.unfollowHandler(u.id)}>unfollow</button>
                            : <button onClick={() => props.followHandler(u.id)}>follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div><div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
            </div>)}
        </div>
    )
}

export default Users