import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import TeamDetailPage from "./pages/team/TeamDetailPage";
import ProjectBoard from "./pages/project/ProjectBoard";
import PublicRoute from "./components/routes/PublicRoute";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Layout>
              <Home />
            </Layout>
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Layout>
              <Login />
            </Layout>
          </PublicRoute>
        }
      />
      <Route
        path="/sign-up"
        element={
          <PublicRoute>
            <Layout>
              <SignUp />
            </Layout>
          </PublicRoute>
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
