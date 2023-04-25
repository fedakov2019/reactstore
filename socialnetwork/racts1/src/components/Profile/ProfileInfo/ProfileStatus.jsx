import React,{useState,useEffect} from "react";
import s from './ProfileInfo.module.css';
const ProfileStatus=(props)=>{
    const [status,SetStatus]=useState(props.status);
    const [editMode,SeteditMode]=useState(false);
    const onStatusChange=(e)=>{
        SetStatus(e.currentTarget.value)
    }
    useEffect(()=>{SetStatus(props.status); },[props.status]);
    return (
        <div>
        {!editMode &&
            <div><b> Status:</b><span onDoubleClick={()=>{SeteditMode(true)}}>{props.status}</span></div>}
            {editMode &&
            <div>

                <input onBlur={()=>{SeteditMode(false); props.UpdateStatus(status)}} autoFocus={true} value={status} onChange={onStatusChange} />
            </div>}
        </div>
    )
}
export default ProfileStatus;