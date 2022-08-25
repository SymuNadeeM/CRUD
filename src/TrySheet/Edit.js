import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

const Edit = () => {
  const { testid } = useParams();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/test/${testid}`).then((res) => {
      setValue("firstName", res.data.firstName);
      setValue("age", res.data.age);
    });
  }, [testid, setValue]);

  const onSubmit = (data) => {
    axios.put(`http://localhost:5000/test/${testid}`, data).then((res) => {
      alert("ur data are updated");
      navigate("/test");
    });
    console.log(data);
  };

  return (
    <div>
      <h3>Edite id {testid}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName")} placeholder="FirstName" />
        <p>{errors.firstName?.message}</p>

        <input {...register("age")} placeholder="age" />
        <p>{errors.age?.message}</p>

        <input type="submit" />
      </form>
    </div>
  );
};

export default Edit;
