
import React from "react";
import  {useNavigate}  from 'react-router-dom';
import Typography  from "@material-ui/core/Typography";
import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { MainConteiner } from "./components/MainContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import { PrimaryButton } from "./components/PrimaryButton";
import { useForm } from "react-hook-form";
import { useData } from "./DataContext";
import * as yup from "yup";
const schema = yup.object().shape({
    firstName: yup
    .string()
    .matches(/^([^0-9]*)$/,"Фамилия не должна содержать цифр")
    .required("Фамилия должна быть заполнена"),
    lastName: yup
    .string()
    .matches(/^([^0-9]*)$/,"Имя не должно содержать цифр")
    .required("Имя не заполнено"),
});
export const Step1 = () => {
    const history =useNavigate();
    const { data,setValues} = useData();
    const { register, handleSubmit, formState:{errors} } = useForm({
        mode: "onBlur", resolver: yupResolver(schema),
        defaultValues: { firstName: data.firstName, lastName: data.lastName },
    });
    const onSubmit = (data) =>{
        history("./step2");
        setValues(data);

    }
    return <MainConteiner>
        <Typography component="h2" variant="h5">👓 Step 1

        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register('firstName')}
                id="firstName"
                type="text"
                label="Фамилия"
                name="firstName"
                
                error={ errors.firstName? true:false}
          helperText={errors.firstName?.message}
                />

                
          
            
            <Input
                {...register('lastName')}
                id="lastName"
                type="text"
                label="Имя"
                name="lastName"
                error={ errors.lastName? true:false}
          helperText={errors.lastName?.message}
            />
 

        <PrimaryButton>Далее</PrimaryButton>

        </Form>
    </MainConteiner>
}