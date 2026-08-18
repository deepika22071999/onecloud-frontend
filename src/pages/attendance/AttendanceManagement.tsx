import { useEffect, useMemo, useState } from "react";
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

function AttendanceManagement() {
  const { employees } = useEmployeeContext();

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [selectedDate, setSelectedDate] =
    useState(today);

  const [search, setSearch] = useState("");

  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  // ================= ATTENDANCE STATE =================

  const [attendance, setAttendance] =
    useState<AttendanceRecord[]>(() => {
      const saved = localStorage.getItem(
        STORAGE_KEY
      );

      if (!saved) {
        return [];
      }

      try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          return parsed;
        }

        return [];
      } catch {
        return [];
      }
    });

  // ================= SAVE TO LOCAL STORAGE =================

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(attendance)
    );
  }, [attendance]);

  // ================= EMPLOYEE ATTENDANCE DATA =================

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
  }, [
    employees,
    attendance,
    selectedDate,
  ]);

  // ================= DEPARTMENTS =================

  const departments = useMemo(() => {
    const uniqueDepartments = Array.from(
      new Set(
        employees.map(
          (employee) => employee.department
        )
      )
    );

    return uniqueDepartments;
  }, [employees]);

  // ================= FILTER =================

  const filteredRecords = useMemo(() => {
    return recordsForDate.filter((record) => {
      const employee = employees.find(
        (item) => item.id === record.employeeId
      );

      if (!employee) {
        return false;
      }

      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(searchValue) ||
        employee.department
          .toLowerCase()
          .includes(searchValue) ||
        employee.designation
          .toLowerCase()
          .includes(searchValue);

      const matchesDepartment =
        departmentFilter === "All" ||
        employee.department ===
          departmentFilter;

      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    recordsForDate,
    employees,
    search,
    departmentFilter,
    statusFilter,
  ]);

  // ================= UPDATE STATUS =================

  const updateStatus = (
    employeeId: number,
    status: AttendanceStatus
  ) => {
    setAttendance((current) => {
      const existingIndex =
        current.findIndex(
          (record) =>
            record.employeeId === employeeId &&
            record.date === selectedDate
        );

      if (existingIndex !== -1) {
        const updated = [...current];

        updated[existingIndex] = {
          ...updated[existingIndex],
          status,
        };

        return updated;
      }

      return [
        ...current,
        {
          id: employeeId,
          employeeId,
          date: selectedDate,
          status,
          checkIn: "-",
          checkOut: "-",
        },
      ];
    });
  };

  // ================= CURRENT TIME =================

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ================= CHECK IN =================

  const handleCheckIn = (employeeId: number) => {
    const currentTime = getCurrentTime();

    setAttendance((current) => {
      const existingIndex =
        current.findIndex(
          (record) =>
            record.employeeId === employeeId &&
            record.date === selectedDate
        );

      if (existingIndex !== -1) {
        const updated = [...current];

        updated[existingIndex] = {
          ...updated[existingIndex],
          status: "Present",
          checkIn: currentTime,
        };

        return updated;
      }

      return [
        ...current,
        {
          id: employeeId,
          employeeId,
          date: selectedDate,
          status: "Present",
          checkIn: currentTime,
          checkOut: "-",
        },
      ];
    });
  };

  // ================= CHECK OUT =================

  const handleCheckOut = (employeeId: number) => {
    const currentTime = getCurrentTime();

    setAttendance((current) => {
      const existingIndex =
        current.findIndex(
          (record) =>
            record.employeeId === employeeId &&
            record.date === selectedDate
        );

      if (existingIndex === -1) {
        return current;
      }

      const updated = [...current];

      updated[existingIndex] = {
        ...updated[existingIndex],
        checkOut: currentTime,
      };

      return updated;
    });
  };

  // ================= COUNTS =================

  const totalEmployees = employees.length;

  const presentCount =
    recordsForDate.filter(
      (record) =>
        record.status === "Present"
    ).length;

  const absentCount =
    recordsForDate.filter(
      (record) =>
        record.status === "Absent"
    ).length;

  const leaveCount =
    recordsForDate.filter(
      (record) =>
        record.status === "Leave"
    ).length;

  const notMarkedCount =
    recordsForDate.filter(
      (record) =>
        record.checkIn === "-" &&
        record.status === "Absent"
    ).length;

  // ================= RESET FILTERS =================

  const resetFilters = () => {
    setSearch("");
    setDepartmentFilter("All");
    setStatusFilter("All");
  };

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
          maxWidth: "1250px",
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
            Attendance Management
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Track employee attendance, check-in
            and check-out timings.
          </p>
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
            title="Present Today"
            value={presentCount}
            icon="✓"
          />

          <SummaryCard
            title="Absent Today"
            value={absentCount}
            icon="✕"
          />

          <SummaryCard
            title="On Leave"
            value={leaveCount}
            icon="📅"
          />
        </div>

        {/* ================= FILTER CARD ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "20px",
            marginBottom: "22px",
            boxShadow:
              "0 5px 18px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1.5fr 1fr 1fr 1fr auto",
              gap: "12px",
              alignItems: "end",
            }}
          >
            {/* DATE */}

            <div>
              <label style={labelStyle}>
                Attendance Date
              </label>

              <input
                type="date"
                value={selectedDate}
                onChange={(event) =>
                  setSelectedDate(
                    event.target.value
                  )
                }
                style={inputStyle}
              />
            </div>

            {/* SEARCH */}

            <div>
              <label style={labelStyle}>
                Search
              </label>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Employee / Department"
                style={inputStyle}
              />
            </div>

            {/* DEPARTMENT */}

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

                {departments.map(
                  (department) => (
                    <option
                      key={department}
                      value={department}
                    >
                      {department}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* STATUS */}

            <div>
              <label style={labelStyle}>
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                style={inputStyle}
              >
                <option value="All">
                  All Status
                </option>

                <option value="Present">
                  Present
                </option>

                <option value="Absent">
                  Absent
                </option>

                <option value="Leave">
                  Leave
                </option>
              </select>
            </div>

            {/* RESET */}

            <button
              type="button"
              onClick={resetFilters}
              style={{
                height: "40px",
                padding: "0 15px",
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
        </div>

        {/* ================= ATTENDANCE TABLE ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "20px",
            overflowX: "auto",
            boxShadow:
              "0 5px 18px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
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
                Employee Attendance
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "13px",
                }}
              >
                Date: {selectedDate}
              </p>
            </div>

            <span
              style={{
                padding: "7px 12px",
                borderRadius: "20px",
                background: "#eff6ff",
                color: "#1769ff",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              {filteredRecords.length} Records
            </span>
          </div>

          {filteredRecords.length > 0 ? (
            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
                minWidth: "1050px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f8fafc",
                    textAlign: "left",
                  }}
                >
                  <th style={thStyle}>
                    ID
                  </th>

                  <th style={thStyle}>
                    Employee
                  </th>

                  <th style={thStyle}>
                    Department
                  </th>

                  <th style={thStyle}>
                    Status
                  </th>

                  <th style={thStyle}>
                    Check In
                  </th>

                  <th style={thStyle}>
                    Check Out
                  </th>

                  <th style={thStyle}>
                    Attendance Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map(
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
                        {/* ID */}

                        <td style={tdStyle}>
                          {employee.id}
                        </td>

                        {/* EMPLOYEE */}

                        <td style={tdStyle}>
                          <strong
                            style={{
                              color:
                                "#172033",
                            }}
                          >
                            {employee.name}
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

                        {/* DEPARTMENT */}

                        <td style={tdStyle}>
                          {
                            employee.department
                          }
                        </td>

                        {/* STATUS */}

                        <td style={tdStyle}>
                          <select
                            value={
                              record.status
                            }
                            onChange={(
                              event
                            ) =>
                              updateStatus(
                                employee.id,
                                event.target
                                  .value as AttendanceStatus
                              )
                            }
                            style={{
                              border:
                                "1px solid #cbd5e1",
                              borderRadius:
                                "7px",
                              padding:
                                "6px 8px",
                              fontSize:
                                "12px",
                              color:
                                "#334155",
                              background:
                                "#ffffff",
                              cursor:
                                "pointer",
                            }}
                          >
                            <option value="Present">
                              Present
                            </option>

                            <option value="Absent">
                              Absent
                            </option>

                            <option value="Leave">
                              Leave
                            </option>
                          </select>
                        </td>

                        {/* CHECK IN */}

                        <td style={tdStyle}>
                          {record.checkIn !==
                          "-" ? (
                            <span
                              style={{
                                display:
                                  "inline-block",
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
                          ) : (
                            <span
                              style={{
                                color:
                                  "#94a3b8",
                              }}
                            >
                              Not checked in
                            </span>
                          )}
                        </td>

                        {/* CHECK OUT */}

                        <td style={tdStyle}>
                          {record.checkOut !==
                          "-" ? (
                            <span
                              style={{
                                display:
                                  "inline-block",
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
                              Not checked out
                            </span>
                          )}
                        </td>

                        {/* ACTION */}

                        <td style={tdStyle}>
                          <div
                            style={{
                              display:
                                "flex",
                              gap: "8px",
                              alignItems:
                                "center",
                              flexWrap:
                                "wrap",
                            }}
                          >
                            {/* CHECK IN */}

                            <button
                              type="button"
                              onClick={() =>
                                handleCheckIn(
                                  employee.id
                                )
                              }
                              disabled={
                                record.checkIn !==
                                "-"
                              }
                              style={{
                                border:
                                  "none",
                                borderRadius:
                                  "7px",
                                padding:
                                  "8px 12px",
                                background:
                                  record.checkIn !==
                                  "-"
                                    ? "#cbd5e1"
                                    : "#059669",
                                color:
                                  "#ffffff",
                                fontSize:
                                  "11px",
                                fontWeight:
                                  600,
                                cursor:
                                  record.checkIn !==
                                  "-"
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              {record.checkIn !==
                              "-"
                                ? "Checked In"
                                : "Check In"}
                            </button>

                            {/* CHECK OUT */}

                            <button
                              type="button"
                              onClick={() =>
                                handleCheckOut(
                                  employee.id
                                )
                              }
                              disabled={
                                record.checkIn ===
                                  "-" ||
                                record.checkOut !==
                                  "-"
                              }
                              style={{
                                border:
                                  "none",
                                borderRadius:
                                  "7px",
                                padding:
                                  "8px 12px",
                                background:
                                  record.checkIn ===
                                    "-" ||
                                  record.checkOut !==
                                    "-"
                                    ? "#cbd5e1"
                                    : "#1769ff",
                                color:
                                  "#ffffff",
                                fontSize:
                                  "11px",
                                fontWeight:
                                  600,
                                cursor:
                                  record.checkIn ===
                                    "-" ||
                                  record.checkOut !==
                                    "-"
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              {record.checkOut !==
                              "-"
                                ? "Checked Out"
                                : "Check Out"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                padding: "50px 20px",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              No attendance records found.
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
            Attendance rule:
          </strong>{" "}
          Check In and Check Out automatically
          capture the current system time.
        </div>

        {/* ================= NOT MARKED INFO ================= */}

        {notMarkedCount > 0 && (
          <div
            style={{
              marginTop: "12px",
              padding: "12px 18px",
              background: "#fff7ed",
              border:
                "1px solid #fed7aa",
              borderRadius: "10px",
              color: "#9a3412",
              fontSize: "12px",
            }}
          >
            <strong>
              Attendance reminder:
            </strong>{" "}
            {notMarkedCount} employee
            {notMarkedCount !== 1
              ? "s are"
              : " is"}{" "}
            not marked yet for this date.
          </div>
        )}
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
          "0 5px 18px rgba(15, 23, 42, 0.05)",
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

// ================= STYLES =================

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  color: "#334155",
  fontSize: "12px",
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  height: "40px",
  padding: "9px 11px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  outline: "none",
  fontSize: "13px",
  color: "#334155",
  background: "#ffffff",
};

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

export default AttendanceManagement;