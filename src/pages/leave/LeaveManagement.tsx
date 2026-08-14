import { useState } from "react";
import { useEmployeeContext } from "../../context/EmployeeContext";

type LeaveRequest = {
  id: number;
  employeeId: number;
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
};

function LeaveManagement() {
  const { employees } = useEmployeeContext();

  const [requests, setRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem("leaveRequests");

    return saved ? JSON.parse(saved) : [];
  });

  const [employeeId, setEmployeeId] = useState("");
  const [leaveType, setLeaveType] = useState("Casual Leave");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const saveRequests = (data: LeaveRequest[]) => {
    setRequests(data);
    localStorage.setItem(
      "leaveRequests",
      JSON.stringify(data)
    );
  };

  const applyLeave = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !employeeId ||
      !fromDate ||
      !toDate ||
      !reason
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (fromDate > toDate) {
      alert("To Date must be after From Date.");
      return;
    }

    const newRequest: LeaveRequest = {
      id: Date.now(),
      employeeId: Number(employeeId),
      leaveType,
      fromDate,
      toDate,
      reason,
      status: "Pending",
    };

    saveRequests([...requests, newRequest]);

    setEmployeeId("");
    setLeaveType("Casual Leave");
    setFromDate("");
    setToDate("");
    setReason("");

    alert(
      "Leave request submitted successfully. Waiting for HR approval."
    );
  };

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
          maxWidth: "1000px",
          margin: "0 auto 30px",
          textAlign: "center",
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
          HRMS LEAVE MANAGEMENT
        </p>

        <h1
          style={{
            margin: 0,
            color: "#172033",
            fontSize: "32px",
          }}
        >
          Apply Leave
        </h1>

        <p
          style={{
            margin: "8px 0 0",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Submit your leave request for HR review and approval.
        </p>
      </div>

      {/* FORM */}

      <div
        style={{
          maxWidth: "750px",
          margin: "0 auto",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          padding: "30px",
          boxShadow:
            "0 5px 18px rgba(15, 23, 42, 0.06)",
        }}
      >
        <form onSubmit={applyLeave}>
          {/* EMPLOYEE */}

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Employee *
            </label>

            <select
              value={employeeId}
              onChange={(event) =>
                setEmployeeId(event.target.value)
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

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Leave Type *
            </label>

            <select
              value={leaveType}
              onChange={(event) =>
                setLeaveType(event.target.value)
              }
              style={inputStyle}
            >
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

          {/* DATES */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}
          >
            <div style={fieldStyle}>
              <label style={labelStyle}>
                From Date *
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

            <div style={fieldStyle}>
              <label style={labelStyle}>
                To Date *
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

          {/* REASON */}

          <div style={fieldStyle}>
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
                resize: "vertical",
              }}
            />
          </div>

          {/* INFO */}

          <div
            style={{
              background: "#eff6ff",
              border: "1px solid #dbeafe",
              borderRadius: "10px",
              padding: "13px 15px",
              marginBottom: "22px",
              color: "#1e40af",
              fontSize: "13px",
            }}
          >
            Your leave request will remain
            <strong> Pending </strong>
            until it is reviewed by HR.
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "#1769ff",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Submit Leave Request
          </button>
        </form>
      </div>

      {/* MY REQUESTS */}

      <div
        style={{
          maxWidth: "1000px",
          margin: "35px auto 0",
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
            fontSize: "21px",
          }}
        >
          Leave Request History
        </h2>

        {requests.length === 0 ? (
          <div
            style={{
              padding: "30px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            No leave requests submitted yet.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "750px",
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
                      style={headerStyle}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {requests.map((request) => {
                  const employee = employees.find(
                    (item) =>
                      item.id === request.employeeId
                  );

                  return (
                    <tr key={request.id}>
                      <td style={cellStyle}>
                        {employee?.name || "Employee"}
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
                              request.status ===
                              "Approved"
                                ? "#ecfdf5"
                                : request.status ===
                                  "Rejected"
                                ? "#fef2f2"
                                : "#fff7ed",
                            color:
                              request.status ===
                              "Approved"
                                ? "#059669"
                                : request.status ===
                                  "Rejected"
                                ? "#dc2626"
                                : "#c2410c",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const fieldStyle = {
  marginBottom: "18px",
};

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
  background: "#ffffff",
};

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

export default LeaveManagement;