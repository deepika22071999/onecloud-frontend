import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";

function Reports() {
  const { employees } = useEmployeeContext();

  /* ================= SUMMARY ================= */

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  /* ================= DEPARTMENT REPORT ================= */

  const departmentReport = useMemo(() => {
    const departmentMap: Record<string, number> = {};

    employees.forEach((employee) => {
      if (departmentMap[employee.department]) {
        departmentMap[employee.department] += 1;
      } else {
        departmentMap[employee.department] = 1;
      }
    });

    return Object.entries(departmentMap).sort(
      (a, b) => b[1] - a[1]
    );
  }, [employees]);

  /* ================= DESIGNATION REPORT ================= */

  const designationReport = useMemo(() => {
    const designationMap: Record<string, number> = {};

    employees.forEach((employee) => {
      if (designationMap[employee.designation]) {
        designationMap[employee.designation] += 1;
      } else {
        designationMap[employee.designation] = 1;
      }
    });

    return Object.entries(designationMap).sort(
      (a, b) => b[1] - a[1]
    );
  }, [employees]);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 76px)",
        background: "#f4f7fb",
        padding: "40px 30px 60px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >
        {/* ================= HEADER ================= */}

        <div style={{ marginBottom: "30px" }}>
          <p
            style={{
              margin: "0 0 6px",
              color: "#1769ff",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            HRMS • REPORTS
          </p>

          <h1
            style={{
              margin: "0 0 8px",
              color: "#172033",
              fontSize: "30px",
            }}
          >
            Employee Reports
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Employee information and workforce summary
            generated from current employee records.
          </p>
        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "25px",
          }}
        >
          {/* Total */}

          <SummaryCard
            title="Total Employees"
            value={totalEmployees}
            description="All employee records"
            icon="👥"
          />

          {/* Active */}

          <SummaryCard
            title="Active Employees"
            value={activeEmployees}
            description="Currently active employees"
            icon="✓"
          />

          {/* Inactive */}

          <SummaryCard
            title="Inactive Employees"
            value={inactiveEmployees}
            description="Currently inactive employees"
            icon="!"
          />

          {/* Departments */}

          <SummaryCard
            title="Departments"
            value={departmentReport.length}
            description="Departments in organization"
            icon="🏢"
          />
        </div>

        {/* ================= DEPARTMENT REPORT ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "25px",
            marginBottom: "25px",
            boxShadow:
              "0 5px 18px rgba(15, 23, 42, 0.06)",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                margin: "0 0 6px",
                color: "#172033",
                fontSize: "20px",
              }}
            >
              Department-wise Report
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Employee distribution across departments.
            </p>
          </div>

          {departmentReport.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "15px",
              }}
            >
              {departmentReport.map(
                ([department, count]) => {
                  const percentage =
                    totalEmployees > 0
                      ? Math.round(
                          (count / totalEmployees) * 100
                        )
                      : 0;

                  return (
                    <div
                      key={department}
                      style={{
                        padding: "18px",
                        background: "#f8fafc",
                        border:
                          "1px solid #e2e8f0",
                        borderRadius: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <strong
                          style={{
                            color: "#334155",
                            fontSize: "14px",
                          }}
                        >
                          {department}
                        </strong>

                        <span
                          style={{
                            color: "#1769ff",
                            fontSize: "18px",
                            fontWeight: 700,
                          }}
                        >
                          {count}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "7px",
                          background: "#e2e8f0",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${percentage}%`,
                            height: "100%",
                            background: "#1769ff",
                            borderRadius: "10px",
                          }}
                        />
                      </div>

                      <p
                        style={{
                          margin:
                            "8px 0 0",
                          color: "#64748b",
                          fontSize: "11px",
                        }}
                      >
                        {percentage}% of
                        workforce
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <EmptyMessage
              message="No department data available."
            />
          )}
        </div>

        {/* ================= DESIGNATION REPORT ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "25px",
            marginBottom: "25px",
            boxShadow:
              "0 5px 18px rgba(15, 23, 42, 0.06)",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                margin: "0 0 6px",
                color: "#172033",
                fontSize: "20px",
              }}
            >
              Designation-wise Report
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Employee count based on designation.
            </p>
          </div>

          {designationReport.length > 0 ? (
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse:
                    "collapse",
                  minWidth: "500px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background:
                        "#f8fafc",
                    }}
                  >
                    <th
                      style={thStyle}
                    >
                      Designation
                    </th>

                    <th
                      style={thStyle}
                    >
                      Employee Count
                    </th>

                    <th
                      style={thStyle}
                    >
                      Percentage
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {designationReport.map(
                    ([designation, count]) => {
                      const percentage =
                        totalEmployees > 0
                          ? Math.round(
                              (count /
                                totalEmployees) *
                                100
                            )
                          : 0;

                      return (
                        <tr
                          key={designation}
                        >
                          <td
                            style={{
                              ...tdStyle,
                              fontWeight: 600,
                            }}
                          >
                            {designation}
                          </td>

                          <td
                            style={tdStyle}
                          >
                            {count}
                          </td>

                          <td
                            style={tdStyle}
                          >
                            {percentage}%
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyMessage
              message="No designation data available."
            />
          )}
        </div>

        {/* ================= EMPLOYEE STATUS REPORT ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "25px",
            marginBottom: "25px",
            boxShadow:
              "0 5px 18px rgba(15, 23, 42, 0.06)",
          }}
        >
          <h2
            style={{
              margin: "0 0 20px",
              color: "#172033",
              fontSize: "20px",
            }}
          >
            Employee Status Report
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "15px",
            }}
          >
            {/* Active */}

            <StatusCard
              title="Active"
              value={activeEmployees}
              total={totalEmployees}
              background="#ecfdf5"
              textColor="#059669"
            />

            {/* Inactive */}

            <StatusCard
              title="Inactive"
              value={inactiveEmployees}
              total={totalEmployees}
              background="#fef2f2"
              textColor="#dc2626"
            />
          </div>
        </div>

        {/* ================= CURRENT EMPLOYEE DATA ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            overflow: "hidden",
            marginBottom: "25px",
            boxShadow:
              "0 5px 18px rgba(15, 23, 42, 0.06)",
          }}
        >
          <div
            style={{
              padding: "22px",
              borderBottom:
                "1px solid #e2e8f0",
            }}
          >
            <h2
              style={{
                margin: "0 0 6px",
                color: "#172033",
                fontSize: "20px",
              }}
            >
              Employee Report
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Current employee records from
              Employee Management.
            </p>
          </div>

          {employees.length > 0 ? (
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse:
                    "collapse",
                  minWidth: "750px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background:
                        "#f8fafc",
                    }}
                  >
                    <th
                      style={thStyle}
                    >
                      ID
                    </th>

                    <th
                      style={thStyle}
                    >
                      Employee Name
                    </th>

                    <th
                      style={thStyle}
                    >
                      Department
                    </th>

                    <th
                      style={thStyle}
                    >
                      Designation
                    </th>

                    <th
                      style={thStyle}
                    >
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map(
                    (employee) => (
                      <tr
                        key={
                          employee.id
                        }
                      >
                        <td
                          style={tdStyle}
                        >
                          {
                            employee.id
                          }
                        </td>

                        <td
                          style={{
                            ...tdStyle,
                            fontWeight: 600,
                          }}
                        >
                          {
                            employee.name
                          }
                        </td>

                        <td
                          style={tdStyle}
                        >
                          {
                            employee.department
                          }
                        </td>

                        <td
                          style={tdStyle}
                        >
                          {
                            employee.designation
                          }
                        </td>

                        <td
                          style={tdStyle}
                        >
                          <span
                            style={{
                              display:
                                "inline-block",
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
                              fontWeight:
                                600,
                            }}
                          >
                            {
                              employee.status
                            }
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyMessage
              message="No employee records available."
            />
          )}
        </div>

        {/* ================= QUICK LINKS ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "25px",
            boxShadow:
              "0 5px 18px rgba(15, 23, 42, 0.06)",
          }}
        >
          <h2
            style={{
              margin: "0 0 18px",
              color: "#172033",
              fontSize: "20px",
            }}
          >
            Quick Access
          </h2>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/employees"
              style={actionStyle}
            >
              Employee Directory
            </Link>

            <Link
              to="/employees/manage"
              style={actionStyle}
            >
              Manage Employees
            </Link>

            <Link
              to="/attendance"
              style={actionStyle}
            >
              Attendance
            </Link>

            <Link
              to="/leave"
              style={actionStyle}
            >
              Leave Management
            </Link>

            <Link
              to="/leave/approval"
              style={actionStyle}
            >
              Leave Approval
            </Link>
          </div>
        </div>

        {/* ================= BACK ================= */}

        <div
          style={{
            marginTop: "25px",
          }}
        >
          <Link
            to="/"
            style={backButtonStyle}
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}


/* =====================================================
   SUMMARY CARD
===================================================== */

function SummaryCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: string;
}) {
  return (
    <div
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
          width: "42px",
          height: "42px",
          borderRadius: "10px",
          background: "#eff6ff",
          color: "#1769ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "19px",
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <p
        style={{
          margin: "0 0 6px",
          color: "#64748b",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        {title}
      </p>

      <h2
        style={{
          margin: "0 0 5px",
          color: "#172033",
          fontSize: "28px",
        }}
      >
        {value}
      </h2>

      <p
        style={{
          margin: 0,
          color: "#94a3b8",
          fontSize: "11px",
        }}
      >
        {description}
      </p>
    </div>
  );
}


/* =====================================================
   STATUS CARD
===================================================== */

function StatusCard({
  title,
  value,
  total,
  background,
  textColor,
}: {
  title: string;
  value: number;
  total: number;
  background: string;
  textColor: string;
}) {
  const percentage =
    total > 0
      ? Math.round((value / total) * 100)
      : 0;

  return (
    <div
      style={{
        padding: "20px",
        background,
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: textColor,
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          {title}
        </span>

        <strong
          style={{
            color: textColor,
            fontSize: "22px",
          }}
        >
          {value}
        </strong>
      </div>

      <p
        style={{
          margin: "10px 0 0",
          color: textColor,
          fontSize: "11px",
        }}
      >
        {percentage}% of total employees
      </p>
    </div>
  );
}


/* =====================================================
   EMPTY MESSAGE
===================================================== */

function EmptyMessage({
  message,
}: {
  message: string;
}) {
  return (
    <div
      style={{
        padding: "35px",
        textAlign: "center",
        color: "#64748b",
        fontSize: "13px",
      }}
    >
      {message}
    </div>
  );
}


/* =====================================================
   TABLE STYLES
===================================================== */

const thStyle = {
  textAlign: "left" as const,
  padding: "14px 18px",
  color: "#475569",
  fontSize: "12px",
  fontWeight: 700,
  borderBottom: "1px solid #e2e8f0",
};

const tdStyle = {
  padding: "15px 18px",
  color: "#334155",
  fontSize: "13px",
  borderBottom: "1px solid #e2e8f0",
};


/* =====================================================
   ACTION BUTTON
===================================================== */

const actionStyle = {
  display: "inline-block",
  padding: "10px 15px",
  borderRadius: "8px",
  background: "#eff6ff",
  color: "#1769ff",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 600,
};


/* =====================================================
   BACK BUTTON
===================================================== */

const backButtonStyle = {
  display: "inline-block",
  padding: "10px 18px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  background: "#ffffff",
  color: "#475569",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 600,
};


export default Reports;