
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmployeeContext } from "../../context/EmployeeContext";

function AddEmployee() {
  const navigate = useNavigate();

  const { employees, addEmployee } = useEmployeeContext();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] =
    useState<"Active" | "Inactive">("Active");
  const [photo, setPhoto] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    department?: string;
    designation?: string;
    photo?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      name?: string;
      department?: string;
      designation?: string;
      photo?: string;
    } = {};

    const trimmedName = name.trim();
    const trimmedDesignation = designation.trim();
    const trimmedPhoto = photo.trim();

    if (!trimmedName) {
      newErrors.name = "Employee name is required.";
    } else if (trimmedName.length < 3) {
      newErrors.name =
        "Employee name must contain at least 3 characters.";
    } else if (!/^[A-Za-z ]+$/.test(trimmedName)) {
      newErrors.name =
        "Employee name should contain only letters.";
    }

    if (!department) {
      newErrors.department =
        "Please select a department.";
    }

    if (!trimmedDesignation) {
      newErrors.designation =
        "Designation is required.";
    } else if (trimmedDesignation.length < 2) {
      newErrors.designation =
        "Designation must contain at least 2 characters.";
    }

    if (
      trimmedPhoto &&
      !/^https?:\/\/.+/i.test(trimmedPhoto)
    ) {
      newErrors.photo =
        "Please enter a valid photo URL.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newId =
      employees.length > 0
        ? Math.max(
            ...employees.map(
              (employee) => employee.id
            )
          ) + 1
        : 101;

    const newEmployee = {
      id: newId,
      name: name.trim(),
      department,
      designation: designation.trim(),
      status,
      photo:
        photo.trim() ||
        "https://via.placeholder.com/100?text=Employee",
    };

    addEmployee(newEmployee);

    alert("Employee added successfully!");

    navigate("/employees/manage");
  };

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
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        {/* Header */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              margin: "0 0 8px",
              color: "#1769ff",
              fontSize: "30px",
            }}
          >
            Add Employee
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
            }}
          >
            Create a new employee record
          </p>
        </div>

        {/* Form Card */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "30px",
            boxShadow:
              "0 5px 18px rgba(15, 23, 42, 0.06)",
          }}
        >
          <form onSubmit={handleSubmit}>

            {/* Employee Name */}

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Employee Name *
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);

                  if (errors.name) {
                    setErrors({
                      ...errors,
                      name: undefined,
                    });
                  }
                }}
                placeholder="Enter employee name"
                style={{
                  ...inputStyle,
                  borderColor: errors.name
                    ? "#dc2626"
                    : "#cbd5e1",
                }}
              />

              {errors.name && (
                <p style={errorStyle}>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Department */}

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Department *
              </label>

              <select
                value={department}
                onChange={(event) => {
                  setDepartment(
                    event.target.value
                  );

                  if (errors.department) {
                    setErrors({
                      ...errors,
                      department: undefined,
                    });
                  }
                }}
                style={{
                  ...inputStyle,
                  borderColor:
                    errors.department
                      ? "#dc2626"
                      : "#cbd5e1",
                }}
              >
                <option value="">
                  Select Department
                </option>

                <option value="Development">
                  Development
                </option>

                <option value="HR">
                  HR
                </option>

                <option value="CRM">
                  CRM
                </option>

                <option value="Finance">
                  Finance
                </option>
              </select>

              {errors.department && (
                <p style={errorStyle}>
                  {errors.department}
                </p>
              )}
            </div>

            {/* Designation */}

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Designation *
              </label>

              <input
                type="text"
                value={designation}
                onChange={(event) => {
                  setDesignation(
                    event.target.value
                  );

                  if (errors.designation) {
                    setErrors({
                      ...errors,
                      designation: undefined,
                    });
                  }
                }}
                placeholder="Enter designation"
                style={{
                  ...inputStyle,
                  borderColor:
                    errors.designation
                      ? "#dc2626"
                      : "#cbd5e1",
                }}
              />

              {errors.designation && (
                <p style={errorStyle}>
                  {errors.designation}
                </p>
              )}
            </div>

            {/* Status */}

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Status
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as
                      | "Active"
                      | "Inactive"
                  )
                }
                style={inputStyle}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

            {/* Photo URL */}

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Photo URL
              </label>

              <input
                type="text"
                value={photo}
                onChange={(event) => {
                  setPhoto(event.target.value);

                  if (errors.photo) {
                    setErrors({
                      ...errors,
                      photo: undefined,
                    });
                  }
                }}
                placeholder="Optional photo URL"
                style={{
                  ...inputStyle,
                  borderColor: errors.photo
                    ? "#dc2626"
                    : "#cbd5e1",
                }}
              />

              {errors.photo && (
                <p style={errorStyle}>
                  {errors.photo}
                </p>
              )}
            </div>

            {/* Buttons */}

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "25px",
              }}
            >
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#1769ff",
                  color: "#ffffff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Add Employee
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/employees/module")
                }
                style={{
                  flex: 1,
                  padding: "12px",
                  border:
                    "1px solid #cbd5e1",
                  borderRadius: "8px",
                  background: "#ffffff",
                  color: "#475569",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
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
};

const errorStyle = {
  margin: "6px 0 0",
  color: "#dc2626",
  fontSize: "12px",
};

export default AddEmployee;
