import { useState } from "react";
import "./EmployeeDirectory.css";

import arunImage from "../../assets/Girl img.webp";
import priyaImage from "../../assets/girl imeges.webp";
import karthikImage from "../../assets/cartoon img.webp";
import divyaImage from "../../assets/boy img.avif";
import rahulImage from "../../assets/cute girl.avif";

type Employee = {
  id: number;
  name: string;
  department: string;
  designation: string;
  status: "Active" | "Inactive";
  photo: string;
};

const employees: Employee[] = [
  {
    id: 101,
    name: "Arun",
    department: "Development",
    designation: "Developer",
    status: "Active",
    photo: arunImage,
  },
  {
    id: 102,
    name: "Priya",
    department: "HR",
    designation: "HR Executive",
    status: "Active",
    photo: priyaImage,
  },
  {
    id: 103,
    name: "Karthik",
    department: "CRM",
    designation: "CRM Executive",
    status: "Active",
    photo: karthikImage,
  },
  {
    id: 104,
    name: "Divya",
    department: "Finance",
    designation: "Accountant",
    status: "Inactive",
    photo: divyaImage,
  },
  {
    id: 105,
    name: "Rahul",
    department: "Development",
    designation: "Frontend Developer",
    status: "Active",
    photo: rahulImage,
  },
];

function EmployeeDirectory() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredEmployees = employees.filter((employee) => {
    const nameMatch = employee.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const departmentMatch =
      department === "All" ||
      employee.department === department;

    const statusMatch =
      status === "All" ||
      employee.status === status;

    return (
      nameMatch &&
      departmentMatch &&
      statusMatch
    );
  });

  const resetFilters = () => {
    setSearch("");
    setDepartment("All");
    setStatus("All");
  };

  return (
    <div className="employee-page">

      {/* Page Heading */}
      <div className="employee-header">
        <h1>
          Employee Directory
        </h1>

        <p>
          Search and manage employee information
        </p>
      </div>


      {/* Search and Filter Section */}
      <div className="employee-filter-panel">

        <div className="filter-group">
          <label>
            Employee Name
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search employee by name"
          />
        </div>


        <div className="filter-group">
          <label>
            Department
          </label>

          <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
          >
            <option value="All">
              All Departments
            </option>

            <option value="HR">
              HR
            </option>

            <option value="CRM">
              CRM
            </option>

            <option value="Finance">
              Finance
            </option>

            <option value="Development">
              Development
            </option>
          </select>
        </div>


        <div className="filter-group">
          <label>
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>


        <div className="filter-buttons">

          <button
            type="button"
            className="search-button"
          >
            Search
          </button>

          <button
            type="button"
            className="reset-button"
            onClick={resetFilters}
          >
            Reset
          </button>

        </div>

      </div>


      {/* Result Count */}
      <div className="employee-result">
        Showing{" "}
        <strong>
          {filteredEmployees.length}
        </strong>{" "}
        employees
      </div>


      {/* Employee Cards */}
      <div className="employee-grid">

        {filteredEmployees.map((employee) => (

          <div
            className="employee-card"
            key={employee.id}
          >

            {/* Employee Photo */}
            <div className="employee-photo-wrapper">

              <img
                src={employee.photo}
                alt={employee.name}
              />

            </div>


            {/* Employee Name */}
            <h2>
              {employee.name}
            </h2>


            {/* Employee Information */}
            <div className="employee-info">

              <p>
                <span>
                  Employee ID
                </span>
                <strong>
                  {employee.id}
                </strong>
              </p>

              <p>
                <span>
                  Department
                </span>
                <strong>
                  {employee.department}
                </strong>
              </p>

              <p>
                <span>
                  Designation
                </span>
                <strong>
                  {employee.designation}
                </strong>
              </p>

            </div>


            {/* Status */}
            <div
              className={`status-badge ${
                employee.status === "Active"
                  ? "active"
                  : "inactive"
              }`}
            >
              {employee.status}
            </div>

          </div>

        ))}

      </div>


      {/* No Results */}
      {filteredEmployees.length === 0 && (

        <div className="no-results">
          <h3>
            No employees found
          </h3>

          <p>
            Try changing your search or filter options.
          </p>
        </div>

      )}

    </div>
  );
}

export default EmployeeDirectory;