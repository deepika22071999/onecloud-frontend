import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Dashboard from "../pages/Dashboard";

import EmployeeManagement from "../pages/employee/EmployeeManagement";
import EmployeeDirectory from "../pages/employee/EmployeeDirectory";
import EmployeeProfile from "../pages/employee/EmployeeProfile";
import AddEmployee from "../pages/employee/AddEmployee";

import AttendanceManagement from "../pages/attendance/AttendanceManagement";
import AttendanceDashboard from "../pages/attendance/AttendanceDashboard";

import LeaveManagement from "../pages/leave/LeaveManagement";
import LeaveApproval from "../pages/leave/LeaveApproval";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>

          {/* ================= DASHBOARD ================= */}

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          {/* ================= EMPLOYEE MANAGEMENT ================= */}

          <Route
            path="employees"
            element={<EmployeeManagement />}
          />

          <Route
            path="employees/manage"
            element={<EmployeeManagement />}
          />

          <Route
            path="employees/add"
            element={<AddEmployee />}
          />

          <Route
            path="employees/profile"
            element={<EmployeeProfile />}
          />

          <Route
            path="employees/directory"
            element={<EmployeeDirectory />}
          />

          {/* ================= ATTENDANCE ================= */}

          <Route
            path="attendance"
            element={<AttendanceManagement />}
          />

          <Route
            path="attendance/dashboard"
            element={<AttendanceDashboard />}
          />

          {/* ================= LEAVE ================= */}

          <Route
            path="leave"
            element={<LeaveManagement />}
          />

          <Route
            path="leave/approval"
            element={<LeaveApproval />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;