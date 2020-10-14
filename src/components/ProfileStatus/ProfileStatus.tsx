import React from "react";

type ProfileStatusPropsType = {
    status: any
}

type ProfileStatusStateType = {
    editMode: boolean
}

class ProfileStatus extends React.Component<ProfileStatusPropsType, ProfileStatusStateType> {
    state = {
        editMode: true
    }

    activateEditModeHandler = () => {
        this.setState({
            editMode: true
        })
    }

    deActivateEditModeHandler = () => {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <>
                {this.state.editMode
                    ? <div><input autoFocus={true} onBlur={this.deActivateEditModeHandler} value={this.props.status}/></div>
                    : <div><span onDoubleClick={this.activateEditModeHandler}>{this.props.status}</span></div>}
            </>
        )
    }
}

export default ProfileStatus