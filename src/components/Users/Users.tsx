import React from "react";
import {UsersPageObjectsType} from "../../redux/UsersPageReducer";
import axios from 'axios'
import userPhoto from '../../assets/images/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg'

type UsersPropsType = {
    usersPage: UsersPageObjectsType[]
    followHandler: (userId: number) => void
    unfollowHandler: (userId: number) => void
    setUsers: (users: UsersPageObjectsType[]) => void
}

export class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => this.props.setUsers(response.data.items))}

    render() {
        return (
            <div>
                {this.props.usersPage.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img style={{width: '5vw', borderRadius: '25px'}}
                             src={u.photos.small != null ? u.photos.small : userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => this.props.unfollowHandler(u.id)}>unfollow</button>
                            : <button onClick={() => this.props.followHandler(u.id)}>follow</button>}
                    </div>
                </span>
                    <span>
                    <span>
                        <div>{u.name}</div><div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
                </div>)}
            </div>
        )
    }
}

export default Users