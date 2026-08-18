import { useEffect, useState } from "react";
import { useEmployeeContext } from "../../context/EmployeeContext";

type LeaveStatus = "Pending" | "Approved" | "Rejected";

type LeaveRequest = {
  id: number;
  employeeId: number;
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: LeaveStatus;
};

const STORAGE_KEY = "leaveRequests";

function LeaveManagement() {
  const { employees } = useEmployeeContext();

  const [requests, setRequests] = useState<LeaveRequest[]>(
    () => {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return [];
      }

      try {
        const parsed = JSON.parse(saved);

        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
  );

  const [employeeId, setEmployeeId] =
    useState("");

  const [leaveType, setLeaveType] =
    useState("");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [reason, setReason] =
    useState("");

  // ================= SAVE REQUESTS =================

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(requests)
    );
  }, [requests]);

  // ================= SUBMIT =================

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !employeeId ||
      !leaveType ||
      !fromDate ||
      !toDate ||
      !reason.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (fromDate > toDate) {
      alert(
        "From Date cannot be after To Date."
      );
      return;
    }

    const newRequest: LeaveRequest = {
      id:
        requests.length > 0
          ? Math.max(
              ...requests.map(
                (request) => request.id
              )
            ) + 1
          : 1,

      employeeId: Number(employeeId),

      leaveType,

      fromDate,

      toDate,

      reason: reason.trim(),

      status: "Pending",
    };

    const updatedRequests = [
      ...requests,
      newRequest,
    ];

    // Save immediately
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedRequests)
    );

    // Update current page
    setRequests(updatedRequests);

    // Tell Leave Approval page
    window.dispatchEvent(
      new Event("leaveRequestsUpdated")
    );

    // Clear form
    setEmployeeId("");
    setLeaveType("");
    setFromDate("");
    setToDate("");
    setReason("");

    alert(
      "Leave request submitted successfully!"
    );
  };

  // ================= EMPLOYEE NAME =================

  const getEmployeeName = (id: number) => {
    return (
      employees.find(
        (employee) => employee.id === id
      )?.name || "Employee"
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
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >

        {/* ================= HEADER ================= */}

        <div
          style={{
            marginBottom: "30px",
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
            HRMS • LEAVE MANAGEMENT
          </p>

          <h1
            style={{
              margin: "0 0 7px",
              color: "#172033",
              fontSize: "30px",
            }}
          >
            Apply Leave
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Submit an employee leave request for HR
            approval.
          </p>
        </div>

        {/* ================= FORM ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "28px",
            marginBottom: "30px",
            boxShadow:
              "0 5px 18px rgba(15,23,42,0.06)",
          }}
        >
          <h2
            style={{
              margin: "0 0 22px",
              color: "#172033",
              fontSize: "20px",
            }}
          >
            Leave Request
          </h2>

          <form onSubmit={handleSubmit}>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "18px",
              }}
            >

              {/* EMPLOYEE */}

              <div>
                <label style={labelStyle}>
                  Employee *
                </label>

                <select
                  value={employeeId}
                  onChange={(event) =>
                    setEmployeeId(
                      event.target.value
                    )
                  }
                  style={inputStyle}
                >
                  <option value="">
                    Select Employee
                  </option>

                  {employees.map((employee) => (
                    <option
                      key={employee.id}
                      value={employee.id}
                    >
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEAVE TYPE */}

              <div>
                <label style={labelStyle}>
                  Leave Type *
                </label>

                <select
                  value={leaveType}
                  onChange={(event) =>
                    setLeaveType(
                      event.target.value
                    )
                  }
                  style={inputStyle}
                >
                  <option value="">
                    Select Leave Type
                  </option>

                  <option value="Casual Leave">
                    Casual Leave
                  </option>

                  <option value="Sick Leave">
                    Sick Leave
                  </option>

                  <option value="Earned Leave">
                    Earned Leave
                  </option>

                  <option value="Emergency Leave">
                    Emergency Leave
                  </option>
                </select>
              </div>

              {/* FROM DATE */}

              <div>
                <label style={labelStyle}>
                  From Date *
                </label>

                <input
                  type="date"
                  value={fromDate}
                  onChange={(event) =>
                    setFromDate(
                      event.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>

              {/* TO DATE */}

              <div>
                <label style={labelStyle}>
                  To Date *
                </label>

                <input
                  type="date"
                  value={toDate}
                  min={fromDate}
                  onChange={(event) =>
                    setToDate(
                      event.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>
            </div>

            {/* REASON */}

            <div
              style={{
                marginTop: "18px",
              }}
            >
              <label style={labelStyle}>
                Reason *
              </label>

              <textarea
                value={reason}
                onChange={(event) =>
                  setReason(event.target.value)
                }
                placeholder="Enter reason for leave"
                rows={4}
                style={{
                  ...inputStyle,
                  height: "auto",
                  resize: "vertical",
                }}
              />
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              style={{
                marginTop: "22px",
                padding: "12px 22px",
                border: "none",
                borderRadius: "8px",
                background: "#1769ff",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Submit Leave Request
            </button>

          </form>
        </div>

        {/* ================= REQUESTS ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "25px",
            boxShadow:
              "0 5px 18px rgba(15,23,42,0.06)",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                margin: "0 0 6px",
                color: "#172033",
                fontSize: "20px",
              }}
            >
              Leave Requests
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Track submitted leave requests and
              approval status.
            </p>
          </div>

          {requests.length > 0 ? (
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
                  <tr>
                    {[
                      "Employee",
                      "Leave Type",
                      "From",
                      "To",
                      "Reason",
                      "Status",
                    ].map((heading) => (
                      <th
                        key={heading}
                        style={thStyle}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id}>

                      <td style={tdStyle}>
                        {getEmployeeName(
                          request.employeeId
                        )}
                      </td>

                      <td style={tdStyle}>
                        {request.leaveType}
                      </td>

                      <td style={tdStyle}>
                        {request.fromDate}
                      </td>

                      <td style={tdStyle}>
                        {request.toDate}
                      </td>

                      <td style={tdStyle}>
                        {request.reason}
                      </td>

                      <td style={tdStyle}>
                        <StatusBadge
                          status={request.status}
                        />
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              style={{
                padding: "35px",
                textAlign: "center",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              No leave requests submitted yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ================= STATUS BADGE =================

function StatusBadge({
  status,
}: {
  status: LeaveStatus;
}) {
  const approved = status === "Approved";
  const rejected = status === "Rejected";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 11px",
        borderRadius: "20px",
        background: approved
          ? "#ecfdf5"
          : rejected
          ? "#fef2f2"
          : "#fff7ed",
        color: approved
          ? "#059669"
          : rejected
          ? "#dc2626"
          : "#c2410c",
        fontSize: "12px",
        fontWeight: 600,
      }}
    >
      {status}
    </span>
  );
}

// ================= STYLES =================

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  color: "#334155",
  fontSize: "13px",
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  height: "42px",
  padding: "9px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  outline: "none",
  background: "#ffffff",
  color: "#334155",
  fontSize: "13px",
};

const thStyle = {
  padding: "13px 10px",
  textAlign: "left" as const,
  background: "#f8fafc",
  color: "#475569",
  fontSize: "12px",
  borderBottom: "1px solid #e2e8f0",
};

const tdStyle = {
  padding: "14px 10px",
  color: "#475569",
  fontSize: "12px",
  borderBottom: "1px solid #e2e8f0",
};

export default LeaveManagement;