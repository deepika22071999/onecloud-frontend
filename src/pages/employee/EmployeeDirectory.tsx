import { useState } from "react";
import { useEmployeeContext } from "../../context/EmployeeContext";
import type { Employee } from "./employeeData";
import { useNavigate } from "react-router-dom";

function EmployeeDirectory() {
  const { employees } = useEmployeeContext();

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  /* ================= FILTER ================= */

  const filteredEmployees = employees.filter(
    (employee) => {
      const search = searchText.toLowerCase().trim();

      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(search) ||
        employee.department
          .toLowerCase()
          .includes(search) ||
        employee.designation
          .toLowerCase()
          .includes(search);

      const matchesDepartment =
        departmentFilter === "All" ||
        employee.department === departmentFilter;

      return matchesSearch && matchesDepartment;
    }
  );

  /* ================= VIEW PROFILE ================= */

  const handleViewProfile = (employee: Employee) => {
    navigate(
      `/employees/profile?id=${employee.id}`
    );
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 76px)",
        background: "#f4f7fb",
        padding: "40px 30px 60px",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >

      {/* ================= HEADER ================= */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 30px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: "0 0 6px",
            color: "#1769ff",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          EMPLOYEE MANAGEMENT
        </p>

        <h1
          style={{
            margin: "0 0 8px",
            color: "#172033",
            fontSize: "30px",
          }}
        >
          Employee Directory
        </h1>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          View employee profiles and organization
          details
        </p>
      </div>


      {/* ================= SUMMARY ================= */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 20px",
          background: "#ffffff",
          padding: "18px 22px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow:
            "0 4px 15px rgba(15, 23, 42, 0.05)",
        }}
      >
        <div>

          <strong
            style={{
              color: "#172033",
              fontSize: "15px",
            }}
          >
            Employee Directory
          </strong>

          <p
            style={{
              margin: "4px 0 0",
              color: "#64748b",
              fontSize: "12px",
            }}
          >
            Showing {filteredEmployees.length} of{" "}
            {employees.length} employees
          </p>

        </div>

        <strong
          style={{
            color: "#1769ff",
            fontSize: "25px",
          }}
        >
          {String(employees.length).padStart(
            2,
            "0"
          )}
        </strong>
      </div>


      {/* ================= SEARCH + FILTER ================= */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 25px",
          background: "#ffffff",
          padding: "18px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          display: "grid",
          gridTemplateColumns:
            "minmax(250px, 1fr) 220px",
          gap: "15px",
        }}
      >

        {/* Search */}

        <div>

          <label style={labelStyle}>
            Search Employee
          </label>

          <input
            type="text"
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
            placeholder="Search name, department or designation..."
            style={inputStyle}
          />

        </div>


        {/* Department */}

        <div>

          <label style={labelStyle}>
            Department
          </label>

          <select
            value={departmentFilter}
            onChange={(event) =>
              setDepartmentFilter(
                event.target.value
              )
            }
            style={inputStyle}
          >

            <option value="All">
              All Departments
            </option>

            <option value="Development">
              Development
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

            <option value="Marketing">
              Marketing
            </option>

          </select>

        </div>

      </div>


      {/* ================= EMPLOYEE CARDS ================= */}

      {filteredEmployees.length > 0 ? (

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >

          {filteredEmployees.map(
            (employee) => (

              <div
                key={employee.id}
                style={{
                  background: "#ffffff",
                  border:
                    "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "22px",
                  textAlign: "center",
                  boxShadow:
                    "0 5px 18px rgba(15, 23, 42, 0.06)",
                }}
              >

                {/* ================= PHOTO ================= */}

                <img
                  src={employee.photo}
                  alt={employee.name}
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border:
                      "4px solid #eff6ff",
                    marginBottom: "12px",
                  }}
                />


                {/* ================= NAME ================= */}

                <h2
                  style={{
                    margin: "0 0 6px",
                    color: "#172033",
                    fontSize: "19px",
                  }}
                >
                  {employee.name}
                </h2>


                {/* ================= DESIGNATION ================= */}

                <p
                  style={{
                    margin: "0 0 6px",
                    color: "#1769ff",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {employee.designation}
                </p>


                {/* ================= DEPARTMENT ================= */}

                <p
                  style={{
                    margin: "0 0 12px",
                    color: "#64748b",
                    fontSize: "13px",
                  }}
                >
                  {employee.department}
                </p>


                {/* ================= STATUS ================= */}

                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 13px",
                    borderRadius: "20px",
                    background:
                      employee.status ===
                      "Active"
                        ? "#ecfdf5"
                        : "#fef2f2",
                    color:
                      employee.status ===
                      "Active"
                        ? "#059669"
                        : "#dc2626",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  ● {employee.status}
                </span>


                {/* ================= VIEW PROFILE ================= */}

                <button
                  type="button"
                  onClick={() =>
                    handleViewProfile(
                      employee
                    )
                  }
                  style={{
                    width: "100%",
                    marginTop: "18px",
                    padding: "10px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#1769ff",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  View Profile
                </button>

              </div>

            )
          )}

        </div>

      ) : (

        /* ================= NO EMPLOYEES ================= */

        <div
          style={{
            maxWidth: "700px",
            margin: "40px auto",
            background: "#ffffff",
            padding: "40px",
            borderRadius: "14px",
            textAlign: "center",
          }}
        >

          <h2
            style={{
              margin: "0 0 8px",
              color: "#172033",
            }}
          >
            No Employees Found
          </h2>

          <p
            style={{
              margin: 0,
              color: "#64748b",
            }}
          >
            Try changing the search or
            department filter.
          </p>

        </div>

      )}

    </div>
  );
}


/* ================= LABEL STYLE ================= */

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "7px",
  color: "#334155",
  fontSize: "12px",
  fontWeight: 600,
};


/* ================= INPUT STYLE ================= */

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  outline: "none",
  fontSize: "13px",
  color: "#334155",
  background: "#ffffff",
};


export default EmployeeDirectory;