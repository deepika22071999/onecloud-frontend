import "./Dashboard.css";

function Dashboard() {
  const comingSoon = () => {
    alert("This feature is Under Progress");
  };

  return (
    <div className="dashboard-page">

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1>Employee Dashboard</h1>
        <p>Welcome back, Admin</p>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">

        {/* Employee Management */}
        <div className="dashboard-card employee-card">
          <div className="dashboard-icon">
            👥
          </div>

          <h2>Employee Management</h2>

          <p>
            Manage employee information and directory.
          </p>

          <a href="/employees">
          Open Module
          </a>
        </div>


        {/* Attendance */}
        <div className="dashboard-card">
          <div className="dashboard-icon">
            🕒
          </div>

          <h2>Attendance</h2>

          <p>
            Track employee attendance and working hours.
          </p>

          <button onClick={comingSoon}>
            Under Progress
          </button>
        </div>


        {/* Leave */}
        <div className="dashboard-card">
          <div className="dashboard-icon">
            📅
          </div>

          <h2>Leave</h2>

          <p>
            Manage employee leave requests and records.
          </p>

          <button onClick={comingSoon}>
            Under Progress
          </button>
        </div>


        {/* Payroll */}
        <div className="dashboard-card">
          <div className="dashboard-icon">
            💰
          </div>

          <h2>Payroll</h2>

          <p>
            Manage salary and payroll information.
          </p>

          <button onClick={comingSoon}>
            Under Progress
          </button>
        </div>


        {/* CRM */}
        <div className="dashboard-card">
          <div className="dashboard-icon">
            🤝
          </div>

          <h2>CRM</h2>

          <p>
            Manage customer and relationship information.
          </p>

          <button onClick={comingSoon}>
            Under Progress
          </button>
        </div>


        {/* Finance */}
        <div className="dashboard-card">
          <div className="dashboard-icon">
            📊
          </div>

          <h2>Finance</h2>

          <p>
            Manage financial information and reports.
          </p>

          <button onClick={comingSoon}>
            Under Progress
          </button>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;