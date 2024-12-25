import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { PrivateRoute, PublicRoute } from "./components/RouteGuard";
import DashboardLayout from "./layouts/DashboardLayout";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Process from "./pages/process/Process";
import ProcessSettings from "./pages/process/ProcessSettings";


function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        } />
        <Route path="/sign-in" element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        } />

        <Route element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }>
          <Route path="/" element={<Process />} />
          <Route path="/process" element={<Process />} />
          <Route path="/process-settings" element={<ProcessSettings />} />
        </Route>

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
