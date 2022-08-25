import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./Employe.css";
import axios from "axios";
import { useEffect } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Full Name should be required please"),
  gender: yup.string().required(),
  age: yup.number().positive().integer().required(),
  city: yup.string().required(),
  position: yup.string().required(),
  phone: yup.string().required(),
});
const EmployeEdite = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/employe/${id}`)
      .then((res) => {
        setIsLoading(false);
        setValue("name", res.data.name);
        setValue("gender", res.data.gender);
        setValue("age", res.data.age);
        setValue("city", res.data.city);
        setValue("position", res.data.position);
        setValue("phone", res.data.phone);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [id, setValue]);

  const submitForm = (data) => {
    axios.put(`http://localhost:5000/employe/${id}`, data).then((res) => {
      navigate("/employe");
      alert("Employe updated successfully!");
    });
    console.log(data);
  };

  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (error != null) {
    return <div>{error}</div>;
  }
  return (
    <>
      <div className="title_div">
        <h2>
          <strong>Edit</strong> Employes
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

export default EmployeEdite;
