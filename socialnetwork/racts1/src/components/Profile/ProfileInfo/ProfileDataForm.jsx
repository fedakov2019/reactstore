
import { Textarea, createField,Input } from "../../common/FormControls/FormsControls";
import { reduxForm } from "redux-form";
import s from './ProfileInfo.module.css';


const ProfileDataForm=({handleSubmit,profile,error})=>{
    return (
        <form onSubmit={handleSubmit}>
        <div>
        <button>Save</button></div>
        {error && <div className={s.formSummaryError}>{error}</div>}
        <div><b>Full name:</b> {createField("Full name","fullName",[],Input)}</div>
<div> <b>Looking for a jib:</b> 
{createField("","lookingForAJob",[],Input,{type:"checkbox"})}
</div>

<div><b> My professional skills:</b>
{createField("My professional skills","lookingForAJobDescription",[],Textarea)}
</div>
<div> <b>About me:</b>
{createField("About me","aboutMe",[],Textarea)}
 </div>
 <div><b>Contacts:</b>
{Object.keys(profile.contacts).map(key=>{
return <div key={key} className={s.contakt}>
<b>  {key}: {createField(key,"contacts."+key,[],Input)}</b>

</div>
})}

</div>
</form>
    )  
}
const ProfileDataFormRedux=reduxForm({form:'edit-profile'})(ProfileDataForm)


export default ProfileDataFormRedux;