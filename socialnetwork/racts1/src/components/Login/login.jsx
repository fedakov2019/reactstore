import { Field, reduxForm } from "redux-form"
import { Input } from "../common/FormControls/FormsControls"
import {required} from "../../utils/validators/validators"
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Login as login } from "../../redux/auth-reducer";
import styles  from "../common/FormControls/FormsControls.module.css";

const Login=(props)=>{
    const onSubmit =(formData)=>{
        props.login(formData.email,formData.password,formData.rememberMe,formData.captcha);

    }
    if (props.isAuth) {return <Navigate to='/profile/'/>}
return <div>

<h1>Login</h1>
<LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
</div>
} 
const LoginForm=({handleSubmit,error,captchaUrl})=>{
    return (
        <form onSubmit={handleSubmit}>
<div>
    <Field placeholder={"Login"} name={"email"} component={Input} validate={[required]} type={"email"}/>
</div>
<div>
    <Field placeholder={"Password"} name={"password"} component={Input} validate={[required]} type={"password"} />
</div>
<div>
  <Field component={Input} name={"rememberMe"} type={"checkbox"} /> remember me  
</div>
{captchaUrl && <img src={captchaUrl}/>}
{captchaUrl && <Field placeholder={"Введите текст с картинки:"} validate={[required]} component={Input} name={"captcha"}  />}
{error && <div className={styles.formSummaryError}>{error}</div>}
<div>
    <button>Login</button>
</div>
</form>
    )
}
const LoginReduxForm =reduxForm({
    form:'login'
})(LoginForm)
const mapStateToProps=(state)=>(
    {isAuth : state.auth.isAuth, captchaUrl:state.auth.captchaUrl }
)
export default connect(mapStateToProps,{login})(Login);