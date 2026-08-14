import { Link } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";

function Dashboard() {
  const { employees } = useEmployeeContext();

  // Dynamic employee counts
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const summaryCards = [
    {
      title: "Total Employees",
      value: String(totalEmployees).padStart(2, "0"),
      icon: "👥",
      description: "Total employee records",
    },
    {
      title: "Active Employees",
      value: String(activeEmployees).padStart(2, "0"),
      icon: "✓",
      description: "Currently active",
    },
    {
      title: "Present Today",
      value: "04",
      icon: "🕒",
      description: "Today's attendance",
    },
    {
      title: "Pending Leave",
      value: "01",
      icon: "📅",
      description: "Requests awaiting approval",
    },
  ];

  const modules = [
    {
      title: "Employee Management",
      icon: "👥",
      description:
        "Manage employee directory, add employees, update records and delete employees.",
      path: "/employees/module",
      status: "Available",
      available: true,
    },
    {
      title: "Attendance",
      icon: "🕒",
      description:
        "Track employee attendance, working hours and daily attendance status.",
      path: "/attendance",
      status: "Available",
      available: true,
    },
    {
      title: "Leave Management",
      icon: "📅",
      description:
        "Manage employee leave requests, approvals and leave records.",
      path: "/leave",
      status: "Available",
      available: true,
    },
    {
      title: "Payroll",
      icon: "💰",
      description:
        "Manage salary, payroll information and employee payment records.",
      path: "#",
      status: "Coming Soon",
      available: false,
    },
    {
      title: "CRM",
      icon: "🤝",
      description:
        "Manage customer relationship information and business interactions.",
      path: "#",
      status: "Coming Soon",
      available: false,
    },
    {
      title: "Finance",
      icon: "📊",
      description:
        "Manage financial information, reports and organization records.",
      path: "#",
      status: "Coming Soon",
      available: false,
    },
  ];

  return (
    <div
      style={{
        minHeight: "calc(100vh - 76px)",
        background: "#f4f7fb",
        padding: "35px 45px 60px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* ================= DASHBOARD HEADER ================= */}

      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto 30px",
        }}
      >
        <p
          style={{
            margin: "0 0 7px",
            color: "#1769ff",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          HRMS DASHBOARD
        </p>

        <h1
          style={{
            margin: "0",
            color: "#172033",
            fontSize: "32px",
            fontWeight: 700,
          }}
        >
          Employee Dashboard
        </h1>

        <p
          style={{
            margin: "8px 0 0",
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Welcome back, Admin. Here is your organization overview.
        </p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}

      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto 35px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {summaryCards.map((card) => (
          <div
            key={card.title}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "22px",
              boxShadow:
                "0 5px 18px rgba(15, 23, 42, 0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <span
                style={{
                  fontSize: "25px",
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </span>

              <span
                style={{
                  color: "#1769ff",
                  fontSize: "28px",
                  fontWeight: 700,
                }}
              >
                {card.value}
              </span>
            </div>

            <h3
              style={{
                margin: "0 0 6px",
                color: "#1e293b",
                fontSize: "16px",
              }}
            >
              {card.title}
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* ================= MODULE SECTION ================= */}

      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#172033",
              fontSize: "23px",
              fontWeight: 700,
            }}
          >
            HRMS Modules
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Select a module to manage your organization.
          </p>
        </div>

        {/* ================= MODULE CARDS ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(330px, 1fr))",
            gap: "22px",
          }}
        >
          {modules.map((module) => (
            <div
              key={module.title}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "25px",
                minHeight: "235px",
                display: "flex",
                flexDirection: "column",
                boxShadow:
                  "0 5px 18px rgba(15, 23, 42, 0.06)",
              }}
            >
              {/* Icon + Status */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "25px",
                  }}
                >
                  {module.icon}
                </div>

                <span
                  style={{
                    padding: "6px 11px",
                    borderRadius: "20px",
                    background: module.available
                      ? "#ecfdf5"
                      : "#f1f5f9",
                    color: module.available
                      ? "#059669"
                      : "#64748b",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  {module.status}
                </span>
              </div>

              {/* Title */}

              <h3
                style={{
                  margin: "0 0 9px",
                  color: "#1769ff",
                  fontSize: "19px",
                  fontWeight: 700,
                }}
              >
                {module.title}
              </h3>

              {/* Description */}

              <p
                style={{
                  margin: "0",
                  color: "#64748b",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                {module.description}
              </p>

              {/* Button */}

              {module.available ? (
                <Link
                  to={module.path}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                    padding: "11px 17px",
                    borderRadius: "8px",
                    background: "#1769ff",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Open Module →
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  style={{
                    marginTop: "20px",
                    padding: "11px 17px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#e2e8f0",
                    color: "#64748b",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "not-allowed",
                  }}
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;