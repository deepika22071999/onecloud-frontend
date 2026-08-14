type Employee = {
  id: number;
  name: string;
  department: string;
  designation: string;
  status: "Active" | "Inactive";
  photo: string;
};

type EmployeeDetailsProps = {
  employee: Employee;
};

function EmployeeDetails({
  employee,
}: EmployeeDetailsProps) {
  return (
    <div className="employee-details">

      <div className="employee-photo-wrapper">
        <img
          src={employee.photo}
          alt={employee.name}
        />
      </div>

      <h2>{employee.name}</h2>

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

        <p>
          <span>Status</span>
          <strong
            className={
              employee.status === "Active"
                ? "employee-status-active"
                : "employee-status-inactive"
            }
          >
            {employee.status}
          </strong>
        </p>

      </div>

    </div>
  );
}

export default EmployeeDetails;