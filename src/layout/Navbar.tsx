import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        padding: "18px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#1769ff",
          fontSize: "22px",
          fontWeight: 700,
        }}
      >
        OneCloud
      </Link>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link
          to="/dashboard"
          style={linkStyle}
        >
          Dashboard
        </Link>

        <Link
          to="/employees"
          style={linkStyle}
        >
          Employees
        </Link>

        <Link
          to="/attendance"
          style={linkStyle}
        >
          Attendance
        </Link>

        <Link
          to="/leave"
          style={linkStyle}
        >
          Leave
        </Link>

        <Link
          to="/leave/approval"
          style={linkStyle}
        >
          Leave Approval
        </Link>

        <Link
          to="/hr-dashboard"
          style={linkStyle}
        >
          HR Dashboard
        </Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#475569",
  fontSize: "13px",
  fontWeight: 600,
};

export default Navbar;