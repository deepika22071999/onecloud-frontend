import { useState } from "react";
import { useEmployeeContext } from "../../context/EmployeeContext";
import type { Employee } from "./employeeData";

function EmployeeProfile() {
  const { employees } = useEmployeeContext();

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(employees[0] || null);

  if (employees.length === 0) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 76px)",
          background: "#f4f7fb",
          padding: "50px 30px",
          textAlign: "center",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <h1 style={{ color: "#1769ff" }}>
          Employee Profile
        </h1>

        <p style={{ color: "#64748b" }}>
          No employee records available.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 76px)",
        background: "#f4f7fb",
        padding: "40px 30px 60px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* ================= HEADER ================= */}

      <div
        style={{
          maxWidth: "1100px",
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
          EMPLOYEE MODULE
        </p>

        <h1
          style={{
            margin: 0,
            color: "#172033",
            fontSize: "30px",
          }}
        >
          Employee Profile
        </h1>

        <p
          style={{
            margin: "8px 0 0",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          View detailed employee information
        </p>
      </div>

      {/* ================= EMPLOYEE SELECTOR ================= */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 25px",
          background: "#ffffff",
          borderRadius: "14px",
          padding: "20px",
          border: "1px solid #e2e8f0",
          boxShadow:
            "0 5px 18px rgba(15, 23, 42, 0.06)",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#334155",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          Select Employee
        </label>

        <select
          value={selectedEmployee?.id ?? ""}
          onChange={(e) => {
            const employee = employees.find(
              (item) =>
                item.id === Number(e.target.value)
            );

            setSelectedEmployee(employee || null);
          }}
          style={{
            width: "100%",
            padding: "11px 12px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            outline: "none",
            fontSize: "14px",
            color: "#334155",
            background: "#ffffff",
          }}
        >
          {employees.map((employee) => (
            <option
              key={employee.id}
              value={employee.id}
            >
              {employee.name} - {employee.designation}
            </option>
          ))}
        </select>
      </div>

      {/* ================= PROFILE CARD ================= */}

      {selectedEmployee && (
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: "18px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            boxShadow:
              "0 8px 25px rgba(15, 23, 42, 0.08)",
          }}
        >
          {/* Profile Top */}

          <div
            style={{
              background:
                "linear-gradient(135deg, #1769ff, #4f8cff)",
              padding: "35px",
              display: "flex",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <img
              src={selectedEmployee.photo}
              alt={selectedEmployee.name}
              style={{
                width: "115px",
                height: "115px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "5px solid #ffffff",
                background: "#ffffff",
              }}
            />

            <div>
              <h2
                style={{
                  margin: "0 0 7px",
                  color: "#ffffff",
                  fontSize: "27px",
                }}
              >
                {selectedEmployee.name}
              </h2>

              <p
                style={{
                  margin: "0 0 10px",
                  color: "#eaf2ff",
                  fontSize: "15px",
                }}
              >
                {selectedEmployee.designation}
              </p>

              <span
                style={{
                  display: "inline-block",
                  padding: "6px 13px",
                  borderRadius: "20px",
                  background:
                    selectedEmployee.status ===
                    "Active"
                      ? "#dcfce7"
                      : "#fee2e2",
                  color:
                    selectedEmployee.status ===
                    "Active"
                      ? "#15803d"
                      : "#dc2626",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                {selectedEmployee.status}
              </span>
            </div>
          </div>

          {/* Details Section */}

          <div
            style={{
              padding: "30px",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px",
                color: "#172033",
                fontSize: "20px",
              }}
            >
              Employee Information
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "18px",
              }}
            >
              <ProfileDetail
                label="Employee ID"
                value={String(selectedEmployee.id)}
              />

              <ProfileDetail
                label="Employee Name"
                value={selectedEmployee.name}
              />

              <ProfileDetail
                label="Department"
                value={selectedEmployee.department}
              />

              <ProfileDetail
                label="Designation"
                value={selectedEmployee.designation}
              />

              <ProfileDetail
                label="Employment Status"
                value={selectedEmployee.status}
              />

              <ProfileDetail
                label="Profile Type"
                value="Employee"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: "18px",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        background: "#f8fafc",
      }}
    >
      <p
        style={{
          margin: "0 0 7px",
          color: "#64748b",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        {label}
      </p>

      <p
        style={{
          margin: 0,
          color: "#1e293b",
          fontSize: "15px",
          fontWeight: 700,
        }}
      >
        {value}
      </p>
    </div>
  );
}

export default EmployeeProfile;