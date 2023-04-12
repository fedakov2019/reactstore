import styles from "./FormsControls.module.css"
const FormControl=({input,meta,child,...props})=>{
    const hassError =meta.touched && meta.error;
    return(
        <div className={styles.formControl+" "+(hassError?styles.error:"")}>
           <div>
           {props.children}
        </div>
        {hassError && <span>{meta.error}</span>}
        </div>)}
        export const Textarea=(props)=>{
            const {input,meta,child,...Rprops}=props
            return (
 <FormControl {...props}><textarea {...input} {...Rprops}/></FormControl>
            )
        }
        export const Input=(props)=>{
            const {input,meta,child,...Rprops}=props
            return (
 <FormControl {...props}><input {...input} {...Rprops}/></FormControl>
            )
        }

        
export const Textarea1 =({input, meta,...props})=>{
    const hassError =meta.touched && meta.error;
    return(
        <div className={styles.formControl+" "+(hassError?styles.error:"")}>
           <div>
           <textarea {...input} {...props}/>
        </div>
        {hassError && <span>{meta.error}</span>}
        </div>)}

export const  Input1 = ({input, meta,...props})=>{
    const hassError =meta.touched && meta.error;
    return(
        <div className={styles.formControl+" "+(hassError?styles.error:"")}>
           <div>
           <input {...input} {...props}/>
        </div>
        {hassError && <span>{meta.error}</span>}
        </div>)}
