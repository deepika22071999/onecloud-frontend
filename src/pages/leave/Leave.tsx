import { useState } from "react";

type LeaveStatus = "Pending" | "Approved" | "Rejected";

type LeaveRequest = {
  id: number;
  employeeName: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: LeaveStatus;
};

function Leave() {
  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      employeeName: "Arun",
      leaveType: "Casual Leave",
      fromDate: "2026-08-15",
      toDate: "2026-08-16",
      reason: "Personal work",
      status: "Pending",
    },
    {
      id: 2,
      employeeName: "Priya",
      leaveType: "Sick Leave",
      fromDate: "2026-08-14",
      toDate: "2026-08-14",
      reason: "Not feeling well",
      status: "Approved",
    },
  ]);

  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const applyLeave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !employeeName ||
      !leaveType ||
      !fromDate ||
      !toDate ||
      !reason
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newRequest: LeaveRequest = {
      id:
        requests.length > 0
          ? Math.max(...requests.map((request) => request.id)) + 1
          : 1,
      employeeName,
      leaveType,
      fromDate,
      toDate,
      reason,
      status: "Pending",
    };

    setRequests((current) => [...current, newRequest]);

    setEmployeeName("");
    setLeaveType("");
    setFromDate("");
    setToDate("");
    setReason("");

    alert("Leave request submitted successfully!");
  };

  const updateStatus = (
    id: number,
    status: LeaveStatus
  ) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? { ...request, status }
          : request
      )
    );
  };

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const approvedCount = requests.filter(
    (request) => request.status === "Approved"
  ).length;

  const rejectedCount = requests.filter(
    (request) => request.status === "Rejected"
  ).length;

  return (
    <div
      style={{
        minHeight: "calc(100vh - 76px)",
        background: "#f4f7fb",
        padding: "40px 30px 60px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* HEADER */}

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
          HRMS LEAVE
        </p>

        <h1
          style={{
            margin: 0,
            color: "#172033",
            fontSize: "32px",
          }}
        >
          Leave Management
        </h1>

        <p
          style={{
            margin: "8px 0 0",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Apply, review and manage employee leave requests.
        </p>
      </div>

      {/* SUMMARY */}

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
          title="Total Requests"
          value={requests.length}
          icon="📋"
        />

        <SummaryCard
          title="Pending"
          value={pendingCount}
          icon="🕒"
        />

        <SummaryCard
          title="Approved"
          value={approvedCount}
          icon="✓"
        />

        <SummaryCard
          title="Rejected"
          value={rejectedCount}
          icon="✕"
        />
      </div>

      {/* APPLY LEAVE */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 30px",
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
            margin: "0 0 20px",
            color: "#172033",
            fontSize: "21px",
          }}
        >
          Apply Leave
        </h2>

        <form onSubmit={applyLeave}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}
          >
            <div>
              <label style={labelStyle}>
                Employee Name
              </label>

              <input
                type="text"
                value={employeeName}
                onChange={(event) =>
                  setEmployeeName(event.target.value)
                }
                placeholder="Enter employee name"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                Leave Type
              </label>

              <select
                value={leaveType}
                onChange={(event) =>
                  setLeaveType(event.target.value)
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

            <div>
              <label style={labelStyle}>
                From Date
              </label>

              <input
                type="date"
                value={fromDate}
                onChange={(event) =>
                  setFromDate(event.target.value)
                }
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                To Date
              </label>

              <input
                type="date"
                value={toDate}
                onChange={(event) =>
                  setToDate(event.target.value)
                }
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginTop: "18px" }}>
            <label style={labelStyle}>
              Reason
            </label>

            <textarea
              value={reason}
              onChange={(event) =>
                setReason(event.target.value)
              }
              placeholder="Enter leave reason"
              rows={3}
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "11px 20px",
              border: "none",
              borderRadius: "8px",
              background: "#1769ff",
              color: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Apply Leave
          </button>
        </form>
      </div>

      {/* LEAVE REQUESTS */}

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
        <h2
          style={{
            margin: "0 0 20px",
            color: "#172033",
            fontSize: "21px",
          }}
        >
          Leave Requests
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              minWidth: "950px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                {[
                  "ID",
                  "Employee",
                  "Leave Type",
                  "From",
                  "To",
                  "Reason",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    style={headerCellStyle}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td style={cellStyle}>
                    {request.id}
                  </td>

                  <td
                    style={{
                      ...cellStyle,
                      fontWeight: 600,
                      color: "#172033",
                    }}
                  >
                    {request.employeeName}
                  </td>

                  <td style={cellStyle}>
                    {request.leaveType}
                  </td>

                  <td style={cellStyle}>
                    {request.fromDate}
                  </td>

                  <td style={cellStyle}>
                    {request.toDate}
                  </td>

                  <td style={cellStyle}>
                    {request.reason}
                  </td>

                  <td style={cellStyle}>
                    <span
                      style={{
                        padding: "6px 11px",
                        borderRadius: "20px",
                        background:
                          request.status === "Approved"
                            ? "#ecfdf5"
                            : request.status === "Rejected"
                            ? "#fef2f2"
                            : "#fff7ed",
                        color:
                          request.status === "Approved"
                            ? "#059669"
                            : request.status === "Rejected"
                            ? "#dc2626"
                            : "#ea580c",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {request.status}
                    </span>
                  </td>

                  <td style={cellStyle}>
                    <div
                      style={{
                        display: "flex",
                        gap: "7px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          updateStatus(
                            request.id,
                            "Approved"
                          )
                        }
                        style={{
                          ...actionButton,
                          background: "#059669",
                        }}
                      >
                        Approve
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateStatus(
                            request.id,
                            "Rejected"
                          )
                        }
                        style={{
                          ...actionButton,
                          background: "#dc2626",
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

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

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  color: "#334155",
  fontSize: "14px",
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "11px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  outline: "none",
  fontSize: "14px",
  color: "#334155",
};

const headerCellStyle = {
  padding: "13px",
  textAlign: "left" as const,
  background: "#f8fafc",
  color: "#475569",
  fontSize: "13px",
  borderBottom: "1px solid #e2e8f0",
};

const cellStyle = {
  padding: "14px 13px",
  borderBottom: "1px solid #e2e8f0",
  color: "#475569",
  fontSize: "13px",
};

const actionButton = {
  border: "none",
  borderRadius: "6px",
  padding: "7px 10px",
  color: "#ffffff",
  fontSize: "11px",
  fontWeight: 600,
  cursor: "pointer",
};

export default Leave;