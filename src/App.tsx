import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import TeamDetailPage from "./pages/team/TeamDetailPage";
import ProjectBoard from "./pages/project/ProjectBoard";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/sign-up"
        element={
          <Layout>
            <SignUp />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/teams/:teamId"
          element={
            <Layout>
              <TeamDetailPage />
            </Layout>
          }
        />
        <Route
          path="/teams/:teamId/project/:projectId"
          element={
            <Layout>
              <ProjectBoard />
            </Layout>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
