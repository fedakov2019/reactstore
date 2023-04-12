import React from 'react';


import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from '../MyPosts/MyPostsContainer';

const Profile = (props) => {
   
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} UpdateStatus={props.UpdateStatus} />
            <MyPostsContainer  />
        </div>
    )
}

export default Profile;