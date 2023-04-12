import React from 'react';
import Loader from '../../Users/Loader';
import ProfileStatus from './ProfileStatus';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Loader />
    }
    return (
        <div>
            <div className={s.h}>
                <img
                    src='https://catherineasquithgallery.com/uploads/posts/2021-02/1613325948_94-p-krasivii-sinii-fon-dlya-shapki-113.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large} />
                <ProfileStatus status={props.status} UpdateStatus={props.UpdateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;