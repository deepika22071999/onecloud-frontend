import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import EmployeeDirectory from "../pages/employee/EmployeeDirectory";
import EmployeeManagement from "../pages/employee/EmployeeManagement";
import EmployeeProfile from "../pages/employee/EmployeeProfile";

import AttendanceManagement from "../pages/attendance/AttendanceManagement";
import AttendanceDashboard from "../pages/attendance/AttendanceDashboard";

import LeaveManagement from "../pages/leave/LeaveManagement";
import LeaveApproval from "../pages/leave/LeaveApproval";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Employee */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeDirectory />} />
        <Route path="/employees/manage" element={<EmployeeManagement />} />
        <Route path="/employees/profile" element={<EmployeeProfile />} />

        {/* Attendance */}
        <Route path="/attendance" element={<AttendanceManagement />} />
        <Route path="/attendance/dashboard" element={<AttendanceDashboard />} />

        {/* Leave */}
        <Route path="/leave" element={<LeaveManagement />} />
        <Route path="/leave/approval" element={<LeaveApproval />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;