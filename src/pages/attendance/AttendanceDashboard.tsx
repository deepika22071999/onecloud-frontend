import { useMemo, useState } from "react";
import { useEmployeeContext } from "../../context/EmployeeContext";

type AttendanceStatus = "Present" | "Absent" | "Leave";

type AttendanceRecord = {
  id: number;
  employeeId: number;
  date: string;
  status: AttendanceStatus;
  checkIn: string;
  checkOut: string;
};

const STORAGE_KEY = "onecloud_attendance";

function AttendanceDashboard() {
  const { employees } = useEmployeeContext();

  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);

  const attendance: AttendanceRecord[] = useMemo(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }, []);

  // ================= ATTENDANCE RECORDS =================

  const recordsForDate = useMemo(() => {
    return employees.map((employee) => {
      const existing = attendance.find(
        (record) =>
          record.employeeId === employee.id &&
          record.date === selectedDate
      );

      if (existing) {
        return existing;
      }

      return {
        id: employee.id,
        employeeId: employee.id,
        date: selectedDate,
        status: "Absent" as AttendanceStatus,
        checkIn: "-",
        checkOut: "-",
      };
    });
  }, [employees, attendance, selectedDate]);

  // ================= COUNTS =================

  const totalEmployees = employees.length;

  const presentCount = recordsForDate.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = recordsForDate.filter(
    (record) => record.status === "Absent"
  ).length;

  const leaveCount = recordsForDate.filter(
    (record) => record.status === "Leave"
  ).length;

  const attendancePercentage =
    totalEmployees > 0
      ? Math.round(
          (presentCount / totalEmployees) * 100
        )
      : 0;

  // ================= DEPARTMENT SUMMARY =================

  const departmentSummary = useMemo(() => {
    const departments = Array.from(
      new Set(
        employees.map(
          (employee) => employee.department
        )
      )
    );

    return departments.map((department) => {
      const departmentEmployees = employees.filter(
        (employee) =>
          employee.department === department
      );

      const departmentPresent = recordsForDate.filter(
        (record) => {
          const employee = employees.find(
            (item) => item.id === record.employeeId
          );

          return (
            employee?.department === department &&
            record.status === "Present"
          );
        }
      ).length;

      const percentage =
        departmentEmployees.length > 0
          ? Math.round(
              (departmentPresent /
                departmentEmployees.length) *
                100
            )
          : 0;

      return {
        department,
        total: departmentEmployees.length,
        present: departmentPresent,
        percentage,
      };
    });
  }, [employees, recordsForDate]);

  // ================= RECENT ATTENDANCE =================

  const recentRecords = useMemo(() => {
    return recordsForDate
      .filter(
        (record) => record.status === "Present"
      )
      .slice(0, 5);
  }, [recordsForDate]);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 76px)",
        background: "#f4f7fb",
        padding: "35px 30px 60px",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* ================= HEADER ================= */}

        <div
          style={{
            marginBottom: "25px",
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
            HRMS ATTENDANCE
          </p>

          <h1
            style={{
              margin: "0 0 7px",
              color: "#172033",
              fontSize: "30px",
            }}
          >
            Attendance Dashboard
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Attendance summary and employee
            attendance overview.
          </p>
        </div>

        {/* ================= DATE ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "18px 20px",
            marginBottom: "22px",
            boxShadow:
              "0 5px 18px rgba(15,23,42,0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                margin: "0 0 5px",
                color: "#172033",
                fontSize: "18px",
              }}
            >
              Attendance Summary
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              View attendance details for the
              selected date.
            </p>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#334155",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Select Date
            </label>

            <input
              type="date"
              value={selectedDate}
              onChange={(event) =>
                setSelectedDate(
                  event.target.value
                )
              }
              style={{
                height: "40px",
                padding: "8px 11px",
                border:
                  "1px solid #cbd5e1",
                borderRadius: "8px",
                outline: "none",
                fontSize: "13px",
                color: "#334155",
              }}
            />
          </div>
        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "18px",
            marginBottom: "25px",
          }}
        >
          <SummaryCard
            title="Total Employees"
            value={totalEmployees}
            icon="👥"
          />

          <SummaryCard
            title="Present"
            value={presentCount}
            icon="✓"
          />

          <SummaryCard
            title="Absent"
            value={absentCount}
            icon="✕"
          />

          <SummaryCard
            title="On Leave"
            value={leaveCount}
            icon="📅"
          />
        </div>

        {/* ================= ATTENDANCE RATE ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "25px",
            marginBottom: "25px",
            boxShadow:
              "0 5px 18px rgba(15,23,42,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: "0 0 5px",
                  color: "#172033",
                  fontSize: "20px",
                }}
              >
                Attendance Rate
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "13px",
                }}
              >
                Overall attendance percentage
              </p>
            </div>

            <strong
              style={{
                color: "#1769ff",
                fontSize: "28px",
              }}
            >
              {attendancePercentage}%
            </strong>
          </div>

          <div
            style={{
              width: "100%",
              height: "12px",
              background: "#e2e8f0",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${attendancePercentage}%`,
                height: "100%",
                background: "#1769ff",
                borderRadius: "20px",
                transition:
                  "width 0.3s ease",
              }}
            />
          </div>

          <p
            style={{
              margin: "10px 0 0",
              color: "#64748b",
              fontSize: "12px",
            }}
          >
            {presentCount} of{" "}
            {totalEmployees} employees are
            present.
          </p>
        </div>

        {/* ================= DEPARTMENT OVERVIEW ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "25px",
            marginBottom: "25px",
            boxShadow:
              "0 5px 18px rgba(15,23,42,0.05)",
          }}
        >
          <h2
            style={{
              margin: "0 0 20px",
              color: "#172033",
              fontSize: "20px",
            }}
          >
            Department Attendance
          </h2>

          {departmentSummary.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "15px",
              }}
            >
              {departmentSummary.map(
                (item) => (
                  <div
                    key={item.department}
                    style={{
                      padding: "18px",
                      border:
                        "1px solid #e2e8f0",
                      borderRadius: "10px",
                      background: "#f8fafc",
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
                          color: "#1769ff",
                          fontSize: "14px",
                        }}
                      >
                        {item.department}
                      </strong>

                      <strong
                        style={{
                          color: "#172033",
                          fontSize: "16px",
                        }}
                      >
                        {item.percentage}%
                      </strong>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        height: "8px",
                        background:
                          "#e2e8f0",
                        borderRadius:
                          "20px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${item.percentage}%`,
                          height: "100%",
                          background:
                            "#1769ff",
                          borderRadius:
                            "20px",
                        }}
                      />
                    </div>

                    <p
                      style={{
                        margin:
                          "10px 0 0",
                        color:
                          "#64748b",
                        fontSize:
                          "12px",
                      }}
                    >
                      {item.present} present
                      out of{" "}
                      {item.total}{" "}
                      employees
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <p
              style={{
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              No department data available.
            </p>
          )}
        </div>

        {/* ================= TODAY'S PRESENT EMPLOYEES ================= */}

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: "0 0 5px",
                  color: "#172033",
                  fontSize: "20px",
                }}
              >
                Present Employees
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "13px",
                }}
              >
                Employees marked present on{" "}
                {selectedDate}
              </p>
            </div>

            <span
              style={{
                padding: "7px 12px",
                borderRadius: "20px",
                background: "#ecfdf5",
                color: "#059669",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              {recentRecords.length} Present
            </span>
          </div>

          {recentRecords.length > 0 ? (
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
                  minWidth: "650px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background:
                        "#f8fafc",
                      textAlign: "left",
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
                      Employee
                    </th>

                    <th
                      style={thStyle}
                    >
                      Department
                    </th>

                    <th
                      style={thStyle}
                    >
                      Check In
                    </th>

                    <th
                      style={thStyle}
                    >
                      Check Out
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentRecords.map(
                    (record) => {
                      const employee =
                        employees.find(
                          (item) =>
                            item.id ===
                            record.employeeId
                        );

                      if (!employee) {
                        return null;
                      }

                      return (
                        <tr
                          key={
                            record.employeeId
                          }
                        >
                          <td
                            style={
                              tdStyle
                            }
                          >
                            {employee.id}
                          </td>

                          <td
                            style={
                              tdStyle
                            }
                          >
                            <strong
                              style={{
                                color:
                                  "#172033",
                              }}
                            >
                              {
                                employee.name
                              }
                            </strong>

                            <div
                              style={{
                                color:
                                  "#94a3b8",
                                fontSize:
                                  "11px",
                                marginTop:
                                  "3px",
                              }}
                            >
                              {
                                employee.designation
                              }
                            </div>
                          </td>

                          <td
                            style={
                              tdStyle
                            }
                          >
                            {
                              employee.department
                            }
                          </td>

                          <td
                            style={
                              tdStyle
                            }
                          >
                            <span
                              style={{
                                padding:
                                  "6px 10px",
                                borderRadius:
                                  "7px",
                                background:
                                  "#ecfdf5",
                                color:
                                  "#059669",
                                fontSize:
                                  "12px",
                                fontWeight:
                                  600,
                              }}
                            >
                              {
                                record.checkIn
                              }
                            </span>
                          </td>

                          <td
                            style={
                              tdStyle
                            }
                          >
                            {record.checkOut !==
                            "-" ? (
                              <span
                                style={{
                                  padding:
                                    "6px 10px",
                                  borderRadius:
                                    "7px",
                                  background:
                                    "#eff6ff",
                                  color:
                                    "#1769ff",
                                  fontSize:
                                    "12px",
                                  fontWeight:
                                    600,
                                }}
                              >
                                {
                                  record.checkOut
                                }
                              </span>
                            ) : (
                              <span
                                style={{
                                  color:
                                    "#94a3b8",
                                }}
                              >
                                Not checked
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              style={{
                padding: "35px 20px",
                textAlign: "center",
                color: "#64748b",
                background:
                  "#f8fafc",
                borderRadius: "10px",
              }}
            >
              No employees are marked
              present for this date.
            </div>
          )}
        </div>

        {/* ================= INFO ================= */}

        <div
          style={{
            marginTop: "18px",
            padding: "14px 18px",
            background: "#eff6ff",
            border:
              "1px solid #dbeafe",
            borderRadius: "10px",
            color: "#475569",
            fontSize: "12px",
          }}
        >
          <strong
            style={{
              color: "#1769ff",
            }}
          >
            Note:
          </strong>{" "}
          Attendance information is displayed
          using the attendance data saved by the
          Attendance Management module.
        </div>
      </div>
    </div>
  );
}

// ================= SUMMARY CARD =================

function SummaryCard({
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
        borderRadius: "12px",
        padding: "20px",
        boxShadow:
          "0 5px 18px rgba(15,23,42,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "24px",
          }}
        >
          {icon}
        </span>

        <strong
          style={{
            color: "#1769ff",
            fontSize: "25px",
          }}
        >
          {value}
        </strong>
      </div>

      <p
        style={{
          margin: "12px 0 0",
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

// ================= TABLE STYLES =================

const thStyle = {
  padding: "13px 10px",
  borderBottom:
    "1px solid #e2e8f0",
  color: "#475569",
  fontSize: "12px",
  fontWeight: 700,
};

const tdStyle = {
  padding: "14px 10px",
  borderBottom:
    "1px solid #e2e8f0",
  color: "#475569",
  fontSize: "12px",
  verticalAlign:
    "middle" as const,
};

export default AttendanceDashboard;