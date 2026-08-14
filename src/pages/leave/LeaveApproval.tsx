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

function LeaveApproval() {
  const { employees } = useEmployeeContext();

  const [requests, setRequests] = useState<LeaveRequest[]>(
    () => {
      const saved = localStorage.getItem("leaveRequests");
      return saved ? JSON.parse(saved) : [];
    }
  );

  const [filter, setFilter] = useState<
    "All" | LeaveStatus
  >("All");

  useEffect(() => {
    localStorage.setItem(
      "leaveRequests",
      JSON.stringify(requests)
    );
  }, [requests]);

  const updateStatus = (
    id: number,
    status: "Approved" | "Rejected"
  ) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? { ...request, status }
          : request
      )
    );
  };

  const getEmployeeName = (employeeId: number) => {
    return (
      employees.find(
        (employee) => employee.id === employeeId
      )?.name || "Employee"
    );
  };

  const filteredRequests =
    filter === "All"
      ? requests
      : requests.filter(
          (request) => request.status === filter
        );

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
          HRMS • HR PANEL
        </p>

        <h1
          style={{
            margin: 0,
            color: "#172033",
            fontSize: "32px",
          }}
        >
          Leave Approval
        </h1>

        <p
          style={{
            margin: "8px 0 0",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Review employee leave requests and manage approvals.
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
          title="Pending Requests"
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

      {/* FILTER */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#172033",
            fontSize: "21px",
          }}
        >
          Employee Leave Requests
        </h2>

        <select
          value={filter}
          onChange={(event) =>
            setFilter(
              event.target.value as
                | "All"
                | LeaveStatus
            )
          }
          style={{
            padding: "10px 14px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            background: "#ffffff",
            color: "#334155",
            fontSize: "13px",
            outline: "none",
          }}
        >
          <option value="All">
            All Requests
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Approved">
            Approved
          </option>

          <option value="Rejected">
            Rejected
          </option>
        </select>
      </div>

      {/* TABLE */}

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
        {filteredRequests.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "950px",
              }}
            >
              <thead>
                <tr>
                  {[
                    "Request ID",
                    "Employee",
                    "Leave Type",
                    "From Date",
                    "To Date",
                    "Reason",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      style={headerStyle}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredRequests.map((request) => (
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
                      {getEmployeeName(
                        request.employeeId
                      )}
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
                      <StatusBadge
                        status={request.status}
                      />
                    </td>

                    <td style={cellStyle}>
                      {request.status === "Pending" ? (
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
                      ) : (
                        <span
                          style={{
                            color: "#94a3b8",
                            fontSize: "12px",
                          }}
                        >
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            style={{
              padding: "50px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "38px",
                marginBottom: "12px",
              }}
            >
              📋
            </div>

            <h3
              style={{
                margin: "0 0 7px",
                color: "#334155",
              }}
            >
              No Leave Requests
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              No leave requests match the selected filter.
            </p>
          </div>
        )}
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

function StatusBadge({
  status,
}: {
  status: LeaveStatus;
}) {
  const isApproved = status === "Approved";
  const isRejected = status === "Rejected";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 11px",
        borderRadius: "20px",
        background: isApproved
          ? "#ecfdf5"
          : isRejected
          ? "#fef2f2"
          : "#fff7ed",
        color: isApproved
          ? "#059669"
          : isRejected
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

const headerStyle = {
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

export default LeaveApproval;