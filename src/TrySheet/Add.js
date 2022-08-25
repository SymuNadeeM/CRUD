import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

const Add = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/test", data)
      .then((res) => {
        alert("create successfully");
        setValue("firstName", "");
        setValue("age", "");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName")} placeholder="FirstName" />
        <p>{errors.firstName?.message}</p>

        <input {...register("age")} placeholder="age" />
        <p>{errors.age?.message}</p>

        <input type="submit" />
      </form>
    </>
  );
};

export default Add;
