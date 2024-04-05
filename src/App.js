import MainDashboard from "./components/MainDashboard/MainDashboard";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <div>
        <MainDashboard />
      </div>
    </SnackbarProvider>
  );
}

export default App;
