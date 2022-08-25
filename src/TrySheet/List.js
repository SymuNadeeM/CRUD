import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";

const List = () => {
  const [tdata, setTData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("are you sure?")) {
      axios.delete(`http://localhost:5000/test/${id}`);
      window.location.reload();
    }
  };

  useEffect(() => {
    const getTsData = async () => {
      setLoading(true);
      await axios
        .get("http://localhost:5000/test")
        .then((res) => {
          setTData(res.data);
          setLoading(false);
          console.log(res.data);
        })
        .then((err) => {
          setError(err.message);
          setLoading(false);
        });
    };
    getTsData();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error != null) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Age</th>
            <th>Edit AndDelete</th>
          </tr>
        </thead>
        <tbody>
          {tdata?.map((item) => {
            console.log(item);
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.age}</td>
                <td>
                  <Link to={`${item.id}`}>Edite</Link>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default List;
