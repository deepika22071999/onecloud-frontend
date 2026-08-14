import { Link } from "react-router-dom";

function EmployeeManagementHome() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 76px)",
        background: "#f4f7fb",
        padding: "50px 30px",
      }}
    >
      {/* Header */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 40px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: "0 0 10px",
            color: "#1769ff",
            fontSize: "32px",
            fontWeight: 700,
          }}
        >
          Employee Management
        </h1>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Manage employee information, records and operations
        </p>
      </div>

      {/* Module Cards */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >

        {/* Employee Directory */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "30px",
            textAlign: "center",
            boxShadow:
              "0 6px 20px rgba(15, 23, 42, 0.07)",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              margin: "0 auto 20px",
              borderRadius: "14px",
              background: "#eff6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            👥
          </div>

          <h2
            style={{
              margin: "0 0 10px",
              color: "#1e293b",
              fontSize: "20px",
            }}
          >
            Employee Directory
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              lineHeight: 1.6,
              minHeight: "45px",
            }}
          >
            View employee profiles, departments and
            designations.
          </p>

          <Link
            to="/employees"
            style={{
              display: "inline-block",
              marginTop: "18px",
              padding: "11px 22px",
              borderRadius: "8px",
              background: "#1769ff",
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Open Directory
          </Link>
        </div>


        {/* Add Employee */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "30px",
            textAlign: "center",
            boxShadow:
              "0 6px 20px rgba(15, 23, 42, 0.07)",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              margin: "0 auto 20px",
              borderRadius: "14px",
              background: "#ecfdf5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            ➕
          </div>

          <h2
            style={{
              margin: "0 0 10px",
              color: "#1e293b",
              fontSize: "20px",
            }}
          >
            Add Employee
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              lineHeight: 1.6,
              minHeight: "45px",
            }}
          >
            Create a new employee record and add it to
            the organization.
          </p>

          <Link
            to="/employees/add"
            style={{
              display: "inline-block",
              marginTop: "18px",
              padding: "11px 22px",
              borderRadius: "8px",
              background: "#16a34a",
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Add Employee
          </Link>
        </div>


        {/* Manage Employees */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "30px",
            textAlign: "center",
            boxShadow:
              "0 6px 20px rgba(15, 23, 42, 0.07)",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              margin: "0 auto 20px",
              borderRadius: "14px",
              background: "#fff7ed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            ⚙️
          </div>

          <h2
            style={{
              margin: "0 0 10px",
              color: "#1e293b",
              fontSize: "20px",
            }}
          >
            Manage Employees
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              lineHeight: 1.6,
              minHeight: "45px",
            }}
          >
            Manage employee records, update information
            and remove employees.
          </p>

          <Link
            to="/employees/manage"
            style={{
              display: "inline-block",
              marginTop: "18px",
              padding: "11px 22px",
              borderRadius: "8px",
              background: "#f97316",
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Manage Employees
          </Link>
        </div>

      </div>
    </div>
  );
}

export default EmployeeManagementHome;