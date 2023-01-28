
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
import { parsePhoneNumberFromString } from 'libphonenumber-js'


import { Checkbox, FormControlLabel } from "@mui/material";
const schema = yup.object().shape({
    email: yup
    .string().email("email не коректен").required("email не заполнен")
    
});
const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value)
    if(!phoneNumber){
      return value
    }
  
    return (
      phoneNumber.formatInternational() 
    );
  };
export const Step2 = () => {
    const history =useNavigate();
    const { setValues, data } = useData();
    const { register, handleSubmit, formState:{errors},watch } = useForm({
        mode: "onBlur", resolver: yupResolver(schema),
        defaultValues: {
            email: data.email,
            hasPhone: data.hasPhone,
            phoneNumber: data.phoneNumber,
             },
    });
    const hasPhone = watch("hasPhone");
    const onSubmit = (data) =>{
        history("/step3");
        setValues(data);

    }
    return <MainConteiner>
        <Typography component="h2" variant="h5">👓 Step 2

        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register('email')}
                id="email"
                type="email"
                label="Email"
                name="email"
                
                error={ errors.email? true:false}
          helperText={errors.email?.message}
                />

            <FormControlLabel 

                control={
                    <Checkbox defaultValue={data.hasPhone} 
                    defaultChecked={data.hasPhone}
                     name="hasPhone"
                      {...register("hasPhone")}
                       color="primary" />
                } label="Ввести телефон"
            />    
           {hasPhone &&  (
          <Input
            {...register('phoneNumber')}
            id="phoneNumber"
            type="tel"
            label="Phone Number"
            name="phoneNumber"
            onChange={(event) => {
              event.target.value = normalizePhoneNumber(event.target.value);
            }}
          /> )}
 

        <PrimaryButton>Далее</PrimaryButton>

        </Form>
    </MainConteiner>
}