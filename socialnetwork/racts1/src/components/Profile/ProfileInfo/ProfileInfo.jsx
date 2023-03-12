import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div className={s.h}>
                <img
                    src='https://catherineasquithgallery.com/uploads/posts/2021-02/1613325948_94-p-krasivii-sinii-fon-dlya-shapki-113.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;