import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

import {
  employees as initialEmployees,
} from "../pages/employee/employeeData";

import type { Employee } from "../pages/employee/employeeData";

type EmployeeContextType = {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: number) => void;
};

const EmployeeContext =
  createContext<EmployeeContextType | undefined>(
    undefined
  );

type EmployeeProviderProps = {
  children: ReactNode;
};

export function EmployeeProvider({
  children,
}: EmployeeProviderProps) {
  const [employees, setEmployees] = useState<Employee[]>(
    () => {
      const savedEmployees =
        localStorage.getItem("employees");

      if (savedEmployees) {
        try {
          return JSON.parse(savedEmployees);
        } catch {
          return initialEmployees;
        }
      }

      return initialEmployees;
    }
  );

  /* ================= SAVE DATA ================= */

  useEffect(() => {
    localStorage.setItem(
      "employees",
      JSON.stringify(employees)
    );
  }, [employees]);

  /* ================= ADD EMPLOYEE ================= */

  const addEmployee = (employee: Employee) => {
    setEmployees((currentEmployees) => [
      ...currentEmployees,
      employee,
    ]);
  };

  /* ================= UPDATE EMPLOYEE ================= */

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees((currentEmployees) =>
      currentEmployees.map((employee) =>
        employee.id === updatedEmployee.id
          ? updatedEmployee
          : employee
      )
    );
  };

  /* ================= DELETE EMPLOYEE ================= */

  const deleteEmployee = (id: number) => {
    setEmployees((currentEmployees) =>
      currentEmployees.filter(
        (employee) => employee.id !== id
      )
    );
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

/* ================= CUSTOM HOOK ================= */

export function useEmployeeContext() {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error(
      "useEmployeeContext must be used inside EmployeeProvider"
    );
  }

  return context;
}