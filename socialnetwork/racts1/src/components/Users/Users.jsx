import React from "react";
import styles from './users.module.css';
import { useEffect } from 'react';
import axios from "axios";
import userPhoto from "./mult-ava-instagram-58.jpg"
const Users = (props) => {
useEffect(()=>{

axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response =>{
    props.setUsers(response.data.items);  
})
    




},[])

    return <div>
        { props.users.map(u => <div key={u.id}>
        <span>
<div>
    <img src={u.photos.small != null ? u.photos.small:userPhoto} className={styles.userPhoto}/>
</div>
<div>
{ u.followed ?
<button onClick={()=>{props.unfollow(u.id)}}>Unfollow</button>
:<button onClick={()=>{props.follow(u.id)}}>Follow</button>
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
