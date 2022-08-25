import axios from "axios";
import "../EmployeSheet/Employe.css";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

const EmployeList = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("are you sure?")) {
      axios.delete(`http://localhost:5000/employe/${id}`);
      window.location.reload();
    }
  };
  useEffect(() => {
    const getData = async () => {
      setloading(true);
      await axios
        .get("http://localhost:5000/employe")
        .then((res) => {
          setData(res.data);
          setloading(false);
          console.log(res);
        })
        .catch((err) => {
          seterror(err);
          setloading(false);
        });
    };
    getData();
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error != null) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="title_div">
        <h2>
          <strong>Details</strong> Of All Employes
        </h2>
      </div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>FullName</th>
            <th>Gender</th>
            <th>Age</th>
            <th>City</th>
            <th>Position</th>
            <th>Phone</th>
            <th>Edite Or Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.gender}</td>
              <td>{item.age}</td>
              <td>{item.city}</td>
              <td>{item.position}</td>
              <td>{item.phone}</td>

              <td>
                <Link to={`${item.id}`}>
                  <BiEdit className="edit_icon" />
                </Link>
                <AiOutlineDelete
                  className="delete_icon"
                  onClick={() => handleDelete(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default EmployeList;
