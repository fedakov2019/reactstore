import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useData } from "./DataContext";
import { MainConteiner } from "./components/MainContainer";
import { FileInput } from "./components/FileInput";
import { PrimaryButton } from "./components/PrimaryButton";
import Typography from "@material-ui/core/Typography";
import { Form } from "./components/Form";

export const Step3 = () => {
  const history = useNavigate();
  const { data, setValues } = useData();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      files: data.files,
    },
  });

  const onSubmit = (data) => {
    history("/result");
    setValues(data);
  };

  return (
    <MainConteiner>
      <Typography component="h2" variant="h5">
      👓 Step 3
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileInput name="files" control={control} />
        <PrimaryButton>Далее</PrimaryButton>
      </Form>
    </MainConteiner>
  );
};