import React from 'react';
import styles from './users.module.css';
import userPhoto from "./mult-ava-instagram-58.jpg"
import { NavLink } from 'react-router-dom';

import { userAPI } from '../../api/api';
import Paginator from '../common/Paginator';
const Users=(props)=>{
    return <div>
    <Paginator totalItemsCount={props.totalUserCount} pageSize={props.pageSize}
    curerentPage={props.currentPage} onPageChange={props.onPageChangrd}/>

    

    
            { props.users.map(u => <div key={u.id}>
            <span>
    <div>
        <NavLink to={'/profile/'+u.id}><img src={u.photos.small != null ? u.photos.small:userPhoto} className={styles.userPhoto}/>
        </NavLink>
    </div>
    <div>
    { u.followed ?
    <button disabled={props.followingInProgress.some(id=>id===u.id)} onClick={()=>{
        props.Unfollow(u.id);
        
        
                       
        
        
        }}>Unfollow</button>
    :<button disabled={props.followingInProgress.some(id=>id===u.id)} onClick={()=>{
        props.Follow(u.id);
        
    
        
        
        }}>Follow</button>
    }
    
    </div>
    
    
            </span>
            <span>
    <span>
        <div>{u.name}</div>
        <div>{u.status}</div>
    </span>
    <span>
        <div>u.location.country</div>
        <div>u.location.city</div>
    </span>
    
            </span>
            </div>
            )
    
    
            }
        </div>
}
export default Users;