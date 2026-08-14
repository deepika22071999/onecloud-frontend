import AppRoutes from "./routes/AppRoutes";
import { EmployeeProvider } from "./context/EmployeeContext";

function App() {
  return (
    <EmployeeProvider>
      <AppRoutes />
    </EmployeeProvider>
  );
}

export default App;