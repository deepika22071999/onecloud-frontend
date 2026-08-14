import { useEffect, useState } from "react";
import { useEmployeeContext } from "../../context/EmployeeContext";

type AttendanceStatus = "Present" | "Absent";

type AttendanceRecord = {
  employeeId: number;
  date: string;
  status: AttendanceStatus;
  checkIn: string;
  checkOut: string;
};

function getLocalDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Attendance() {
  const { employees } = useEmployeeContext();

  const today = getLocalDate();

  // Selected attendance date
  const [selectedDate, setSelectedDate] =
    useState(today);

  // Load attendance from localStorage
  const [attendance, setAttendance] =
    useState<AttendanceRecord[]>(() => {
      try {
        const saved =
          localStorage.getItem("attendanceRecords");

        if (!saved) {
          return [];
        }

        const parsed = JSON.parse(saved);

        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error(
          "Error loading attendance:",
          error
        );

        return [];
      }
    });

  // Save attendance
  useEffect(() => {
    localStorage.setItem(
      "attendanceRecords",
      JSON.stringify(attendance)
    );
  }, [attendance]);

  // Get selected day's record
  const getRecord = (employeeId: number) => {
    return attendance.find(
      (record) =>
        record.employeeId === employeeId &&
        record.date === selectedDate
    );
  };

  // Check In
  const handleCheckIn = (employeeId: number) => {
    setAttendance((current) => {
      const existingRecord = current.find(
        (record) =>
          record.employeeId === employeeId &&
          record.date === selectedDate
      );

      if (existingRecord) {
        return current.map((record) =>
          record.employeeId === employeeId &&
          record.date === selectedDate
            ? {
                ...record,
                status: "Present",
                checkIn:
                  record.checkIn === "-"
                    ? getCurrentTime()
                    : record.checkIn,
              }
            : record
        );
      }

      return [
        ...current,
        {
          employeeId,
          date: selectedDate,
          status: "Present",
          checkIn: getCurrentTime(),
          checkOut: "-",
        },
      ];
    });
  };

  // Mark Absent
  const handleAbsent = (employeeId: number) => {
    setAttendance((current) => {
      const existingRecord = current.find(
        (record) =>
          record.employeeId === employeeId &&
          record.date === selectedDate
      );

      if (existingRecord) {
        return current.map((record) =>
          record.employeeId === employeeId &&
          record.date === selectedDate
            ? {
                ...record,
                status: "Absent",
                checkIn: "-",
                checkOut: "-",
              }
            : record
        );
      }

      return [
        ...current,
        {
          employeeId,
          date: selectedDate,
          status: "Absent",
          checkIn: "-",
          checkOut: "-",
        },
      ];
    });
  };

  // Check Out
  const handleCheckOut = (employeeId: number) => {
    setAttendance((current) =>
      current.map((record) =>
        record.employeeId === employeeId &&
        record.date === selectedDate &&
        record.status === "Present" &&
        record.checkOut === "-"
          ? {
              ...record,
              checkOut: getCurrentTime(),
            }
          : record
      )
    );
  };

  // Summary counts for selected date
  const presentCount = employees.filter(
    (employee) =>
      getRecord(employee.id)?.status === "Present"
  ).length;

  const absentCount = employees.filter(
    (employee) =>
      getRecord(employee.id)?.status === "Absent"
  ).length;

  const notMarkedCount =
    employees.length -
    presentCount -
    absentCount;

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
          maxWidth: "1200px",
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
          HRMS ATTENDANCE
        </p>

        <h1
          style={{
            margin: 0,
            color: "#172033",
            fontSize: "32px",
          }}
        >
          Attendance Management
        </h1>

        <p
          style={{
            margin: "8px 0 0",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Track employee attendance and working hours.
        </p>
      </div>

      {/* ================= DATE SELECTOR ================= */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 25px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          padding: "18px 22px",
          boxShadow:
            "0 5px 18px rgba(15, 23, 42, 0.06)",
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
              fontSize: "19px",
            }}
          >
            Attendance Date
          </h2>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Select a date to view or manage attendance.
          </p>
        </div>

        <input
          type="date"
          value={selectedDate}
          max={today}
          onChange={(event) =>
            setSelectedDate(event.target.value)
          }
          style={{
            padding: "10px 14px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#334155",
            outline: "none",
            cursor: "pointer",
          }}
        />
      </div>

      {/* ================= SUMMARY ================= */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 30px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "18px",
        }}
      >
        <SummaryCard
          title="Total Employees"
          value={employees.length}
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
          title="Not Marked"
          value={notMarkedCount}
          icon="🕒"
        />
      </div>

      {/* ================= ATTENDANCE TABLE ================= */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          padding: "25px",
          boxShadow:
            "0 5px 18px rgba(15, 23, 42, 0.06)",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              margin: "0 0 5px",
              color: "#172033",
              fontSize: "21px",
            }}
          >
            Attendance for {selectedDate}
          </h2>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Employee attendance and working hours
          </p>
        </div>

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "900px",
            }}
          >
            <thead>
              <tr>
                {[
                  "ID",
                  "Employee",
                  "Department",
                  "Status",
                  "Check In",
                  "Check Out",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      padding: "13px",
                      textAlign: "left",
                      background: "#f8fafc",
                      color: "#475569",
                      fontSize: "13px",
                      borderBottom:
                        "1px solid #e2e8f0",
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => {
                const record = getRecord(
                  employee.id
                );

                const isPresent =
                  record?.status === "Present";

                const isAbsent =
                  record?.status === "Absent";

                const canCheckOut =
                  isPresent &&
                  record?.checkOut === "-";

                return (
                  <tr key={employee.id}>
                    {/* ID */}

                    <td style={cellStyle}>
                      {employee.id}
                    </td>

                    {/* Employee */}

                    <td
                      style={{
                        ...cellStyle,
                        fontWeight: 600,
                        color: "#172033",
                      }}
                    >
                      {employee.name}
                    </td>

                    {/* Department */}

                    <td style={cellStyle}>
                      {employee.department}
                    </td>

                    {/* Status */}

                    <td style={cellStyle}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          background:
                            isPresent
                              ? "#ecfdf5"
                              : isAbsent
                              ? "#fef2f2"
                              : "#f1f5f9",
                          color:
                            isPresent
                              ? "#059669"
                              : isAbsent
                              ? "#dc2626"
                              : "#64748b",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        {record?.status ||
                          "Not Marked"}
                      </span>
                    </td>

                    {/* Check In */}

                    <td style={cellStyle}>
                      {record?.checkIn || "-"}
                    </td>

                    {/* Check Out */}

                    <td style={cellStyle}>
                      {record?.checkOut || "-"}
                    </td>

                    {/* Actions */}

                    <td style={cellStyle}>
                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            handleCheckIn(
                              employee.id
                            )
                          }
                          disabled={
                            isPresent || isAbsent
                          }
                          style={{
                            ...buttonStyle,
                            background:
                              isPresent || isAbsent
                                ? "#94a3b8"
                                : "#059669",
                            cursor:
                              isPresent || isAbsent
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          Check In
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleAbsent(
                              employee.id
                            )
                          }
                          disabled={
                            isPresent || isAbsent
                          }
                          style={{
                            ...buttonStyle,
                            background:
                              isPresent || isAbsent
                                ? "#94a3b8"
                                : "#dc2626",
                            cursor:
                              isPresent || isAbsent
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          Absent
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleCheckOut(
                              employee.id
                            )
                          }
                          disabled={!canCheckOut}
                          style={{
                            ...buttonStyle,
                            background:
                              canCheckOut
                                ? "#1769ff"
                                : "#94a3b8",
                            cursor:
                              canCheckOut
                                ? "pointer"
                                : "not-allowed",
                          }}
                        >
                          Check Out
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* No Employees */}

        {employees.length === 0 && (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            No employees available.
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= SUMMARY CARD ================= */

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
        borderRadius: "14px",
        padding: "20px",
        boxShadow:
          "0 5px 18px rgba(15, 23, 42, 0.06)",
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
            width: "45px",
            height: "45px",
            borderRadius: "12px",
            background: "#eff6ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
          }}
        >
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

      <h3
        style={{
          margin: "15px 0 0",
          color: "#334155",
          fontSize: "15px",
        }}
      >
        {title}
      </h3>
    </div>
  );
}

/* ================= TABLE STYLE ================= */

const cellStyle = {
  padding: "14px 13px",
  borderBottom: "1px solid #e2e8f0",
  color: "#475569",
  fontSize: "13px",
};

const buttonStyle = {
  border: "none",
  borderRadius: "6px",
  padding: "8px 11px",
  color: "#ffffff",
  fontSize: "11px",
  fontWeight: 600,
};

export default Attendance;