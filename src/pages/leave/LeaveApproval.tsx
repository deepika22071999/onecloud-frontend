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

function LeaveApproval() {
  const { employees } = useEmployeeContext();

  const [requests, setRequests] = useState<LeaveRequest[]>(() => {
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
  });

  const [statusFilter, setStatusFilter] = useState("All");

  // ================= SAVE REQUESTS =================

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(requests)
    );
  }, [requests]);

  // ================= UPDATE STATUS =================

  const updateStatus = (
    id: number,
    status: LeaveStatus
  ) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? {
              ...request,
              status,
            }
          : request
      )
    );
  };

  // ================= EMPLOYEE NAME =================

  const getEmployeeName = (employeeId: number) => {
    return (
      employees.find(
        (employee) => employee.id === employeeId
      )?.name || "Unknown Employee"
    );
  };

  // ================= FILTER =================

  const filteredRequests = requests.filter((request) => {
    return (
      statusFilter === "All" ||
      request.status === statusFilter
    );
  });

  // ================= COUNTS =================

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
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* ================= HEADER ================= */}

        <div
          style={{
            marginBottom: "28px",
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
            HRMS • LEAVE APPROVAL
          </p>

          <h1
            style={{
              margin: "0 0 7px",
              color: "#172033",
              fontSize: "30px",
            }}
          >
            Leave Approval
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Review employee leave requests and
            approve or reject them.
          </p>
        </div>

        {/* ================= SUMMARY ================= */}

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
            title="Total Requests"
            value={requests.length}
            icon="📋"
          />

          <SummaryCard
            title="Pending"
            value={pendingCount}
            icon="⏳"
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

        {/* ================= FILTER ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "20px",
            marginBottom: "22px",
            boxShadow:
              "0 5px 18px rgba(15,23,42,0.05)",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              color: "#334155",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Filter by Status
          </label>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            style={{
              height: "40px",
              padding: "8px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#334155",
              fontSize: "13px",
              minWidth: "200px",
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

        {/* ================= REQUEST TABLE ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "20px",
            overflowX: "auto",
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
                Employee Leave Requests
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "13px",
                }}
              >
                Review and manage submitted leave
                requests.
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
              {filteredRequests.length} Requests
            </span>
          </div>

          {filteredRequests.length > 0 ? (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
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
                    Employee
                  </th>

                  <th style={thStyle}>
                    Leave Type
                  </th>

                  <th style={thStyle}>
                    From
                  </th>

                  <th style={thStyle}>
                    To
                  </th>

                  <th style={thStyle}>
                    Reason
                  </th>

                  <th style={thStyle}>
                    Status
                  </th>

                  <th style={thStyle}>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    {/* EMPLOYEE */}

                    <td style={tdStyle}>
                      <strong
                        style={{
                          color: "#172033",
                        }}
                      >
                        {getEmployeeName(
                          request.employeeId
                        )}
                      </strong>
                    </td>

                    {/* LEAVE TYPE */}

                    <td style={tdStyle}>
                      {request.leaveType}
                    </td>

                    {/* FROM */}

                    <td style={tdStyle}>
                      {request.fromDate}
                    </td>

                    {/* TO */}

                    <td style={tdStyle}>
                      {request.toDate}
                    </td>

                    {/* REASON */}

                    <td
                      style={{
                        ...tdStyle,
                        maxWidth: "220px",
                      }}
                    >
                      {request.reason}
                    </td>

                    {/* STATUS */}

                    <td style={tdStyle}>
                      <StatusBadge
                        status={request.status}
                      />
                    </td>

                    {/* ACTION */}

                    <td style={tdStyle}>
                      {request.status ===
                      "Pending" ? (
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
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
                              border: "none",
                              borderRadius: "7px",
                              padding:
                                "8px 12px",
                              background:
                                "#059669",
                              color: "#ffffff",
                              fontSize: "11px",
                              fontWeight: 600,
                              cursor: "pointer",
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
                              border: "none",
                              borderRadius: "7px",
                              padding:
                                "8px 12px",
                              background:
                                "#dc2626",
                              color: "#ffffff",
                              fontSize: "11px",
                              fontWeight: 600,
                              cursor: "pointer",
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
                          Action completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                padding: "50px 20px",
                textAlign: "center",
                color: "#64748b",
                background: "#f8fafc",
                borderRadius: "10px",
              }}
            >
              No leave requests found.
            </div>
          )}
        </div>

        {/* ================= INFO ================= */}

        <div
          style={{
            marginTop: "18px",
            padding: "14px 18px",
            background: "#eff6ff",
            border: "1px solid #dbeafe",
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
            Approval rule:
          </strong>{" "}
          Pending leave requests can be approved or
          rejected by HR.
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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "23px" }}>
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

// ================= TABLE STYLES =================

const thStyle = {
  padding: "13px 10px",
  borderBottom: "1px solid #e2e8f0",
  color: "#475569",
  fontSize: "12px",
  fontWeight: 700,
};

const tdStyle = {
  padding: "14px 10px",
  borderBottom: "1px solid #e2e8f0",
  color: "#475569",
  fontSize: "12px",
  verticalAlign: "middle" as const,
};

export default LeaveApproval;