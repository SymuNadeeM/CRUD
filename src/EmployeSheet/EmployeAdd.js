import React from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
// import { MdSportsCricket } from "react-icons/md";
import * as yup from "yup";
import "./Employe.css";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Full Name should be required please"),
  gender: yup.string().required(),
  age: yup.number().positive().integer().required(),
  city: yup.string().required(),
  position: yup.string().required(),
  phone: yup.string().required(),
});

const EmployeAdd = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/employe", data)
      .then((res) => {
        alert("player create successfully!");

        setValue("name", "");
        setValue("gender", "");
        setValue("age", "");
        setValue("city", "");
        setValue("position", "");
        setValue("phone", "");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="title_div">
        <h2>
          <strong>Add</strong> Employes
        </h2>
      </div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="row">
          <div className="col-lg-6">
            <div className="childen_div">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" {...register("name")} />
              <p> {errors.Name?.message} </p>
            </div>

            <div className="childen_div">
              <label htmlFor="gender">gender</label>
              <input type="text" name="gender" {...register("gender")} />
              <p> {errors.gender?.message} </p>
            </div>

            <div className="childen_div">
              <label htmlFor="age">Age</label>
              <input type="text" name="age" {...register("age")} />
              <p> {errors.age?.message} </p>
            </div>
          </div>
          <div className="col-6">
            <div className="childen_div">
              <label htmlFor="city">City</label>
              <input type="text" name="city" {...register("city")} />
              <p> {errors.city?.message} </p>
            </div>
            <div className="childen_div">
              <label htmlFor="position">Position</label>
              <input type="text" name="position" {...register("position")} />
              <p> {errors.position?.message} </p>
            </div>
            <div className="childen_div">
              <label htmlFor="phone">Phone</label>
              <input type="text" name="phone" {...register("phone")} />
              <p> {errors.phone?.message} </p>
            </div>
          </div>
          <div className="submit_button">
            <input type="submit" id="submit" />
          </div>
        </div>
      </form>
    </>
  );
};

export default EmployeAdd;
