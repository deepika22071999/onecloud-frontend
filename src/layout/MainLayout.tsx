import logo from "../assets/company logo.jpeg";
import { NavLink, Outlet } from "react-router-dom";
import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="app-layout">

      {/* ================= NAVBAR ================= */}

      <header className="main-navbar">

        <div className="navbar-brand">
        <img
        src={logo}
        alt="One Enterprise Logo"
        style={{
        width: "150px",
        height: "auto",
        objectFit: "contain",
        }}
      />

  <span>Employee Management System</span>
</div>

        <nav className="navbar-menu">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/employees"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Employees
          </NavLink>

          <NavLink
            to="/employees/add"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Add Employee
          </NavLink>

          <NavLink
            to="/employees/manage"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Manage Employees
          </NavLink>

          <NavLink
            to="/attendance"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Attendance
          </NavLink>

          <NavLink
            to="/leave"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Leave
          </NavLink>

          <NavLink
            to="/leave/approval"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Leave Approval
          </NavLink>

          <NavLink
            to="/hr-dashboard"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            HR Dashboard
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Reports
          </NavLink>

        </nav>

      </header>


      {/* ================= PAGE CONTENT ================= */}

      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default MainLayout;