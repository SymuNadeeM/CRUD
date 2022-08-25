import { Routes, Route } from "react-router-dom";
import "./App.css";
import EmployeAdd from "./EmployeSheet/EmployeAdd";
import EmployeEdite from "./EmployeSheet/EmployeEdite";
import EmployeList from "./EmployeSheet/EmployeList";
import LayoutPage from "./PageLayOut/LayoutPage";
// import Add from "./TrySheet/Add";
// import Edit from "./TrySheet/Edit";
// import List from "./TrySheet/List";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="employe">
            <Route index element={<EmployeList />} />
            <Route path="empadd" element={<EmployeAdd />} />
            <Route path=":id" element={<EmployeEdite />} />
          </Route>

          {/* <Route path="test">
            <Route index element={<List />} />
            <Route path="add" element={<Add />} />
            <Route path=":testid" element={<Edit />} />
          </Route> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
