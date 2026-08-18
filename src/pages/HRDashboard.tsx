import { useMemo } from "react";
import { useEmployeeContext } from "../context/EmployeeContext";

function HRDashboard() {
  const { employees } = useEmployeeContext();

  const activeEmployees = useMemo(
    () =>
      employees.filter(
        (employee) => employee.status === "Active"
      ).length,
    [employees]
  );

  const inactiveEmployees =
    employees.length - activeEmployees;

  const departments = useMemo(
    () =>
      new Set(
        employees.map(
          (employee) => employee.department
        )
      ).size,
    [employees]
  );

  return (
    <div
      style={{
        minHeight: "calc(100vh - 76px)",
        background: "#f4f7fb",
        padding: "35px 30px 60px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            margin: "0 0 7px",
            color: "#1769ff",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          HRMS
        </p>

        <h1
          style={{
            margin: "0 0 8px",
            color: "#172033",
            fontSize: "30px",
          }}
        >
          HR Dashboard
        </h1>

        <p
          style={{
            margin: "0 0 28px",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Overview of employees and HR activities.
        </p>

        {/* SUMMARY */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "25px",
          }}
        >
          <Card
            title="Total Employees"
            value={employees.length}
            icon="👥"
          />

          <Card
            title="Active Employees"
            value={activeEmployees}
            icon="✓"
          />

          <Card
            title="Inactive Employees"
            value={inactiveEmployees}
            icon="○"
          />

          <Card
            title="Departments"
            value={departments}
            icon="🏢"
          />
        </div>

        {/* QUICK ACTIONS */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "25px",
            boxShadow:
              "0 5px 18px rgba(15,23,42,0.05)",
          }}
        >
          <h2
            style={{
              margin: "0 0 20px",
              color: "#172033",
              fontSize: "21px",
            }}
          >
            HR Quick Actions
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "15px",
            }}
          >
            <Action
              title="Manage Employees"
              text="View and manage employee records"
              path="/employees/manage"
            />

            <Action
              title="Attendance"
              text="Track employee attendance"
              path="/attendance"
            />

            <Action
              title="Leave Approval"
              text="Review employee leave requests"
              path="/leave/approval"
            />

            <Action
              title="Add Employee"
              text="Create a new employee record"
              path="/employees/add"
            />
          </div>
        </div>

        {/* DEPARTMENTS */}

        <div
          style={{
            marginTop: "22px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "25px",
            boxShadow:
              "0 5px 18px rgba(15,23,42,0.05)",
          }}
        >
          <h2
            style={{
              margin: "0 0 18px",
              color: "#172033",
              fontSize: "21px",
            }}
          >
            Department Overview
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "12px",
            }}
          >
            {Array.from(
              new Set(
                employees.map(
                  (employee) => employee.department
                )
              )
            ).map((department) => {
              const count = employees.filter(
                (employee) =>
                  employee.department === department
              ).length;

              return (
                <div
                  key={department}
                  style={{
                    padding: "18px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    background: "#f8fafc",
                  }}
                >
                  <strong
                    style={{
                      color: "#1769ff",
                    }}
                  >
                    {department}
                  </strong>

                  <p
                    style={{
                      margin: "7px 0 0",
                      color: "#64748b",
                      fontSize: "13px",
                    }}
                  >
                    {count} employee
                    {count !== 1 ? "s" : ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "14px",
        padding: "20px",
        boxShadow:
          "0 5px 18px rgba(15,23,42,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "22px" }}>
          {icon}
        </span>

        <strong
          style={{
            color: "#1769ff",
            fontSize: "26px",
          }}
        >
          {value}
        </strong>
      </div>

      <p
        style={{
          margin: "14px 0 0",
          color: "#475569",
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        {title}
      </p>
    </div>
  );
}

function Action({
  title,
  text,
  path,
}: {
  title: string;
  text: string;
  path: string;
}) {
  return (
    <a
      href={path}
      style={{
        textDecoration: "none",
        padding: "18px",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        background: "#f8fafc",
        color: "#172033",
      }}
    >
      <strong>{title}</strong>

      <p
        style={{
          margin: "7px 0 0",
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        {text}
      </p>
    </a>
  );
}

export default HRDashboard;