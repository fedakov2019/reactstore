import React from 'react';


import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from '../MyPosts/MyPostsContainer';

const Profile = (props) => {
   
    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto} isowner={props.isowner} profile={props.profile} status={props.status} UpdateStatus={props.UpdateStatus} saveData={props.saveData} />
            <MyPostsContainer  />
        </div>
    )
}

export default Profile;