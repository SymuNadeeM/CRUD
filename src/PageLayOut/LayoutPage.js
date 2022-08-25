import React from "react";
import "../EmployeSheet/Employe.css";
import Button from "react-bootstrap/Button";
import { Link, Outlet } from "react-router-dom";

const LayoutPage = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-2 link_Part">
            <div className="buuton_one">
              <Button variant="outline-warning">
                <Link className="link_homp" to="employe">
                  All Employes
                </Link>
              </Button>
            </div>

            <div className="button_two">
              <Button variant="outline-success">
                <Link className="link_homp" to="employe/empadd">
                  Employee Add
                </Link>
              </Button>
            </div>
            <div className="button_two">
              <Button variant="outline-success">
                <Link className="link_homp" to="test">
                  List
                </Link>
              </Button>
            </div>
            <div className="button_two">
              <Button variant="outline-success">
                <Link className="link_homp" to="test/add">
                  Add
                </Link>
              </Button>
            </div>
          </div>
          <div className="col-lg-10 outLate_Part">
            <Outlet className="outlet_origin" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutPage;
