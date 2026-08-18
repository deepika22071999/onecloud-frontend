import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useEmployeeContext } from "../../context/EmployeeContext";

function EmployeeProfile() {
  const { employees } = useEmployeeContext();
  const [searchParams] = useSearchParams();

  const employeeId = Number(
    searchParams.get("id")
  );

  const employee = useMemo(() => {
    return employees.find(
      (item) => item.id === employeeId
    );
  }, [employees, employeeId]);

  // If no employee is selected
  if (!employee) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 76px)",
          background: "#f4f7fb",
          padding: "40px 30px",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#172033",
              marginBottom: "10px",
            }}
          >
            Employee Not Found
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            Please select an employee to view
            the profile.
          </p>

          <Link
            to="/employees"
            style={{
              display: "inline-block",
              padding: "10px 18px",
              background: "#1769ff",
              color: "#ffffff",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Back to Employees
          </Link>
        </div>
      </div>
    );
  }

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
          maxWidth: "1100px",
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
            HRMS • EMPLOYEE
          </p>

          <h1
            style={{
              margin: "0 0 7px",
              color: "#172033",
              fontSize: "30px",
            }}
          >
            Employee Profile
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            View employee information and
            employment details.
          </p>
        </div>

        {/* ================= PROFILE HEADER ================= */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "28px",
            marginBottom: "22px",
            boxShadow:
              "0 5px 18px rgba(15,23,42,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "22px",
              flexWrap: "wrap",
            }}
          >
            {/* AVATAR */}

            <div
              style={{
                width: "85px",
                height: "85px",
                borderRadius: "50%",
                background: "#eff6ff",
                color: "#1769ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                fontWeight: 700,
              }}
            >
              {employee.name
                .charAt(0)
                .toUpperCase()}
            </div>

            {/* NAME */}

            <div style={{ flex: 1 }}>
              <h2
                style={{
                  margin: "0 0 6px",
                  color: "#172033",
                  fontSize: "24px",
                }}
              >
                {employee.name}
              </h2>

              <p
                style={{
                  margin: "0 0 8px",
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                {employee.designation}
              </p>

              <span
                style={{
                  display: "inline-block",
                  padding: "6px 11px",
                  borderRadius: "20px",
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
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {employee.status}
              </span>
            </div>

            {/* BACK */}

            <Link
              to="/employees"
              style={{
                padding: "9px 15px",
                border:
                  "1px solid #cbd5e1",
                borderRadius: "8px",
                color: "#475569",
                background: "#ffffff",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              ← Back
            </Link>
          </div>
        </div>

        {/* ================= BASIC INFORMATION ================= */}

        <ProfileSection title="Basic Information">
          <InfoItem
            label="Employee ID"
            value={String(employee.id)}
          />

          <InfoItem
            label="Full Name"
            value={employee.name}
          />

          <InfoItem
            label="Department"
            value={employee.department}
          />

          <InfoItem
            label="Designation"
            value={employee.designation}
          />

          <InfoItem
            label="Employment Status"
            value={employee.status}
          />
        </ProfileSection>

        {/* ================= CONTACT INFORMATION ================= */}

        <ProfileSection title="Contact Information">
          <InfoItem
            label="Email"
            value={
              "email" in employee
                ? String(
                    employee.email || "-"
                  )
                : "-"
            }
          />

          <InfoItem
            label="Phone"
            value={
              "phone" in employee
                ? String(
                    employee.phone || "-"
                  )
                : "-"
            }
          />

          <InfoItem
            label="Address"
            value={
              "address" in employee
                ? String(
                    employee.address || "-"
                  )
                : "-"
            }
          />
        </ProfileSection>

        {/* ================= EMPLOYMENT DETAILS ================= */}

        <ProfileSection title="Employment Details">
          <InfoItem
            label="Department"
            value={employee.department}
          />

          <InfoItem
            label="Designation"
            value={employee.designation}
          />

          <InfoItem
            label="Status"
            value={employee.status}
          />

          <InfoItem
            label="Employee ID"
            value={String(employee.id)}
          />
        </ProfileSection>

        {/* ================= QUICK ACTIONS ================= */}

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
          <h2
            style={{
              margin: "0 0 18px",
              color: "#172033",
              fontSize: "20px",
            }}
          >
            Quick Actions
          </h2>

          <div
            style={{
              display: "flex",
              gap: "12px",
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
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= PROFILE SECTION =================

function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "14px",
        padding: "25px",
        marginBottom: "22px",
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
        {title}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "18px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ================= INFO ITEM =================

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: "15px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
      }}
    >
      <p
        style={{
          margin: "0 0 6px",
          color: "#94a3b8",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>

      <strong
        style={{
          color: "#334155",
          fontSize: "14px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

// ================= ACTION STYLE =================

const actionStyle = {
  display: "inline-block",
  padding: "10px 16px",
  borderRadius: "8px",
  background: "#eff6ff",
  color: "#1769ff",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 600,
};

export default EmployeeProfile;