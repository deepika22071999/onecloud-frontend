import { useState } from "react";
import { useEmployeeContext } from "../../context/EmployeeContext";
import type { Employee } from "./employeeData";
import type { CSSProperties } from "react";

function EmployeeManagement() {
  const {
    employees,
    updateEmployee,
    deleteEmployee,
  } = useEmployeeContext();

  /* ================= FILTER STATES ================= */

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  /* ================= EDIT STATES ================= */

  const [editingEmployee, setEditingEmployee] =
    useState<Employee | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    designation: "",
    status: "Active" as "Active" | "Inactive",
  });

  /* ================= DEPARTMENTS ================= */

  const departments = [
    "All",
    ...Array.from(
      new Set(
        employees.map(
          (employee) => employee.department
        )
      )
    ),
  ];

  /* ================= FILTER EMPLOYEES ================= */

  const filteredEmployees = employees.filter(
    (employee) => {
      const search = searchTerm
        .toLowerCase()
        .trim();

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

      const matchesStatus =
        statusFilter === "All" ||
        employee.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    }
  );

  /* ================= EDIT ================= */

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);

    setFormData({
      name: employee.name,
      department: employee.department,
      designation: employee.designation,
      status: employee.status,
    });
  };

  /* ================= SAVE EDIT ================= */

  const handleSave = () => {
    if (!editingEmployee) return;

    if (
      !formData.name.trim() ||
      !formData.department.trim() ||
      !formData.designation.trim()
    ) {
      alert("Please fill all employee details.");
      return;
    }

    updateEmployee({
      ...editingEmployee,
      name: formData.name.trim(),
      department: formData.department,
      designation: formData.designation.trim(),
      status: formData.status,
    });

    setEditingEmployee(null);
  };

  /* ================= DELETE ================= */

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    deleteEmployee(id);
  };

  /* ================= RESET FILTERS ================= */

  const resetFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("All");
    setStatusFilter("All");
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
          maxWidth: "1150px",
          margin: "0 auto 30px",
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
          Manage Employees
        </h1>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          View, search, filter, edit and delete
          employee records
        </p>
      </div>

      {/* ================= SUMMARY ================= */}

      <div
        style={{
          maxWidth: "1150px",
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
        <span
          style={{
            color: "#475569",
            fontWeight: 600,
          }}
        >
          Total Employees
        </span>

        <strong
          style={{
            color: "#1769ff",
            fontSize: "24px",
          }}
        >
          {employees.length}
        </strong>
      </div>

      {/* ================= EMPLOYEE TABLE CARD ================= */}

      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          boxShadow:
            "0 5px 18px rgba(15, 23, 42, 0.06)",
        }}
      >
        {/* ================= CARD HEADER ================= */}

        <div
          style={{
            padding: "22px",
            borderBottom:
              "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              margin: "0 0 5px",
              color: "#172033",
              fontSize: "19px",
            }}
          >
            Employee Records
          </h2>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Search and filter employees or
            update employee information.
          </p>
        </div>

        {/* ================= FILTER SECTION ================= */}

        <div
          style={{
            padding: "18px 22px",
            borderBottom:
              "1px solid #e2e8f0",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Search */}

          <input
            type="text"
            placeholder="Search employee..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            style={{
              flex: 1,
              minWidth: "220px",
              padding: "10px 12px",
              border:
                "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "13px",
              outline: "none",
            }}
          />

          {/* Department */}

          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(
                e.target.value
              )
            }
            style={{
              minWidth: "180px",
              padding: "10px 12px",
              border:
                "1px solid #cbd5e1",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#334155",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            {departments.map(
              (department) => (
                <option
                  key={department}
                  value={department}
                >
                  {department === "All"
                    ? "All Departments"
                    : department}
                </option>
              )
            )}
          </select>

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            style={{
              minWidth: "150px",
              padding: "10px 12px",
              border:
                "1px solid #cbd5e1",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#334155",
              fontSize: "13px",
              cursor: "pointer",
            }}
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

          {/* Reset */}

          <button
            type="button"
            onClick={resetFilters}
            style={{
              padding: "10px 15px",
              border:
                "1px solid #cbd5e1",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#475569",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        {/* ================= RESULT COUNT ================= */}

        <div
          style={{
            padding: "12px 22px",
            background: "#f8fafc",
            borderBottom:
              "1px solid #e2e8f0",
            color: "#64748b",
            fontSize: "12px",
          }}
        >
          Showing{" "}
          <strong
            style={{
              color: "#1769ff",
            }}
          >
            {filteredEmployees.length}
          </strong>{" "}
          of{" "}
          <strong>
            {employees.length}
          </strong>{" "}
          employees
        </div>

        {/* ================= TABLE ================= */}

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "850px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                }}
              >
                <th style={thStyle}>
                  ID
                </th>

                <th style={thStyle}>
                  Employee Name
                </th>

                <th style={thStyle}>
                  Department
                </th>

                <th style={thStyle}>
                  Designation
                </th>

                <th style={thStyle}>
                  Status
                </th>

                <th style={thStyle}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map(
                (employee) => (
                  <tr
                    key={employee.id}
                  >
                    <td style={tdStyle}>
                      {employee.id}
                    </td>

                    <td
                      style={{
                        ...tdStyle,
                        fontWeight: 600,
                      }}
                    >
                      {employee.name}
                    </td>

                    <td style={tdStyle}>
                      {employee.department}
                    </td>

                    <td style={tdStyle}>
                      {employee.designation}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          padding:
                            "5px 11px",
                          borderRadius:
                            "20px",
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
                          fontSize:
                            "12px",
                          fontWeight: 600,
                        }}
                      >
                        {employee.status}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <div
                        style={{
                          display:
                            "flex",
                          gap: "8px",
                        }}
                      >
                        {/* Edit */}

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(
                              employee
                            )
                          }
                          style={
                            editButtonStyle
                          }
                        >
                          Edit
                        </button>

                        {/* Delete */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              employee.id
                            )
                          }
                          style={
                            deleteButtonStyle
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* ================= NO RESULTS ================= */}

        {filteredEmployees.length ===
          0 && (
          <div
            style={{
              padding: "50px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                marginBottom: "8px",
                color: "#334155",
              }}
            >
              No Employees Found
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              No employee matches the
              selected filters.
            </p>
          </div>
        )}
      </div>

      {/* ================= EDIT MODAL ================= */}

      {editingEmployee && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(15, 23, 42, 0.60)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 3000,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              background: "#ffffff",
              borderRadius: "16px",
              padding: "30px",
              boxShadow:
                "0 25px 60px rgba(15, 23, 42, 0.25)",
            }}
          >
            {/* Modal Header */}

            <h2
              style={{
                margin: "0 0 5px",
                color: "#172033",
              }}
            >
              Edit Employee
            </h2>

            <p
              style={{
                margin: "0 0 20px",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Update employee information.
            </p>

            {/* Name */}

            <label style={labelStyle}>
              Employee Name
            </label>

            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              style={inputStyle}
            />

            {/* Department */}

            <label style={labelStyle}>
              Department
            </label>

            <select
              value={formData.department}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department:
                    e.target.value,
                })
              }
              style={inputStyle}
            >
              {departments
                .filter(
                  (department) =>
                    department !== "All"
                )
                .map((department) => (
                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>
                ))}
            </select>

            {/* Designation */}

            <label style={labelStyle}>
              Designation
            </label>

            <input
              value={formData.designation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  designation:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

            {/* Status */}

            <label style={labelStyle}>
              Status
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status:
                    e.target.value as
                      | "Active"
                      | "Inactive",
                })
              }
              style={inputStyle}
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

            {/* Buttons */}

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "25px",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setEditingEmployee(null)
                }
                style={
                  cancelButtonStyle
                }
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                style={
                  saveButtonStyle
                }
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const thStyle: CSSProperties = {
  textAlign: "left",
  padding: "14px 18px",
  color: "#475569",
  fontSize: "12px",
  fontWeight: 700,
  borderBottom:
    "1px solid #e2e8f0",
};

const tdStyle: CSSProperties = {
  padding: "15px 18px",
  color: "#334155",
  fontSize: "13px",
  borderBottom:
    "1px solid #e2e8f0",
};

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: "7px",
  marginTop: "15px",
  color: "#334155",
  fontSize: "13px",
  fontWeight: 600,
};

const inputStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 12px",
  border:
    "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "13px",
  outline: "none",
};

const editButtonStyle: CSSProperties = {
  border: "none",
  borderRadius: "7px",
  padding: "8px 13px",
  background: "#eff6ff",
  color: "#1769ff",
  fontSize: "12px",
  fontWeight: 600,
  cursor: "pointer",
};

const deleteButtonStyle: CSSProperties = {
  border: "none",
  borderRadius: "7px",
  padding: "8px 13px",
  background: "#fef2f2",
  color: "#dc2626",
  fontSize: "12px",
  fontWeight: 600,
  cursor: "pointer",
};

const cancelButtonStyle: CSSProperties = {
  flex: 1,
  padding: "11px",
  border:
    "1px solid #cbd5e1",
  borderRadius: "8px",
  background: "#ffffff",
  color: "#475569",
  fontWeight: 600,
  cursor: "pointer",
};

const saveButtonStyle: CSSProperties = {
  flex: 1,
  padding: "11px",
  border: "none",
  borderRadius: "8px",
  background: "#1769ff",
  color: "#ffffff",
  fontWeight: 600,
  cursor: "pointer",
};

export default EmployeeManagement;