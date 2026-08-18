import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import HRDashboard from "../pages/HRDashboard";
import Reports from "../pages/Reports";

// ================= EMPLOYEE =================

import AddEmployee from "../pages/employee/AddEmployee";
import EmployeeManagement from "../pages/employee/EmployeeManagement";
import EmployeeDirectory from "../pages/employee/EmployeeDirectory";
import EmployeeProfile from "../pages/employee/EmployeeProfile";

// ================= ATTENDANCE =================

import AttendanceManagement from "../pages/attendance/AttendanceManagement";
import AttendanceDashboard from "../pages/attendance/AttendanceDashboard";

// ================= LEAVE =================

import LeaveManagement from "../pages/leave/LeaveManagement";
import LeaveApproval from "../pages/leave/LeaveApproval";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            MAIN LAYOUT
        ================================================= */}

        <Route path="/" element={<MainLayout />}>

          {/* =================================================
              DASHBOARD
          ================================================= */}

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          {/* =================================================
              EMPLOYEE
          ================================================= */}

          {/* Employee Directory */}
          <Route
            path="employees"
            element={<EmployeeDirectory />}
          />

          {/* Manage Employees */}
          <Route
            path="employees/manage"
            element={<EmployeeManagement />}
          />

          {/* Employee Management Module */}
          <Route
            path="employees/module"
            element={<EmployeeManagement />}
          />

          {/* Employee Management Extra Route */}
          <Route
            path="employee-management"
            element={<EmployeeManagement />}
          />

          {/* Add Employee */}
          <Route
            path="employees/add"
            element={<AddEmployee />}
          />

          {/* Add Employee Extra Route */}
          <Route
            path="add-employee"
            element={<AddEmployee />}
          />

          {/* Employee Profile */}
          <Route
            path="employees/profile"
            element={<EmployeeProfile />}
          />

          {/* =================================================
              ATTENDANCE
          ================================================= */}

          {/* Attendance Management */}
          <Route
            path="attendance"
            element={<AttendanceManagement />}
          />

          {/* Attendance Management Extra Route */}
          <Route
            path="attendance/manage"
            element={<AttendanceManagement />}
          />

          <Route
            path="attendance/management"
            element={<AttendanceManagement />}
          />

          {/* Attendance Dashboard */}
          <Route
            path="attendance/dashboard"
            element={<AttendanceDashboard />}
          />

          {/* =================================================
              LEAVE
          ================================================= */}

          {/* Leave Management */}
          <Route
            path="leave"
            element={<LeaveManagement />}
          />

          {/* Leave Management Extra Route */}
          <Route
            path="leave/management"
            element={<LeaveManagement />}
          />

          {/* Leave Approval */}
          <Route
            path="leave/approval"
            element={<LeaveApproval />}
          />

          {/* =================================================
              HR DASHBOARD
          ================================================= */}

          <Route
            path="hr-dashboard"
            element={<HRDashboard />}
          />

        </Route>

          {/* ================= REPORTS ================= */}

        <Route
        path="reports"
        element={<Reports />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;