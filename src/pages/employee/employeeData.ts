import arunImage from "../../assets/Girl img.webp";
import priyaImage from "../../assets/girl imeges.webp";
import karthikImage from "../../assets/cartoon img.webp";
import divyaImage from "../../assets/boy img.avif";
import rahulImage from "../../assets/cute girl.avif";

export type Employee = {
  id: number;
  name: string;
  department: string;
  designation: string;
  status: "Active" | "Inactive";
  photo: string;
};

export const employees: Employee[] = [
  {
    id: 101,
    name: "Arun",
    department: "Development",
    designation: "Developer",
    status: "Active",
    photo: arunImage,
  },
  {
    id: 102,
    name: "Priya",
    department: "HR",
    designation: "HR Executive",
    status: "Active",
    photo: priyaImage,
  },
  {
    id: 103,
    name: "Karthik",
    department: "CRM",
    designation: "CRM Executive",
    status: "Active",
    photo: karthikImage,
  },
  {
    id: 104,
    name: "Divya",
    department: "Finance",
    designation: "Accountant",
    status: "Inactive",
    photo: divyaImage,
  },
  {
    id: 105,
    name: "Rahul",
    department: "Development",
    designation: "Frontend Developer",
    status: "Active",
    photo: rahulImage,
  },
];