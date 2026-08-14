import { Link } from "react-router-dom";

type Employee = {
  id: number;
  name: string;
  department: string;
  designation: string;
  status: "Active" | "Inactive";
  photo: string;
};

type EmployeeCardProps = {
  employee: Employee;
};

function EmployeeCard({
  employee,
}: EmployeeCardProps) {

  return (
    <div className="employee-card">

      {/* Employee Photo */}

      <div className="employee-photo-wrapper">

        <img
          src={employee.photo}
          alt={employee.name}
        />

      </div>


      {/* Employee Name */}

      <h2>
        {employee.name}
      </h2>


      {/* Employee Information */}

      <div className="employee-info">

        <p>
          <span>Employee ID</span>
          <strong>{employee.id}</strong>
        </p>

        <p>
          <span>Department</span>
          <strong>{employee.department}</strong>
        </p>

        <p>
          <span>Designation</span>
          <strong>{employee.designation}</strong>
        </p>

      </div>


      {/* Status */}

      <div
        className={`status-badge ${
          employee.status === "Active"
            ? "active"
            : "inactive"
        }`}
      >
        {employee.status}
      </div>


      {/* View Details */}

      <Link
        to={`/employees/profile?id=${employee.id}`}
        className="view-details-button"
      >
        View Details
      </Link>

    </div>
  );
}

export default EmployeeCard;