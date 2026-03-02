import { Routes, Route } from 'react-router-dom';
import PublicPage from './pages/PublicPage';
import AdminPage from './pages/AdminPage';
import MigratePage from './pages/MigratePage';
import ArtworkPage from './pages/ArtworkPage';
import LoginForm from './components/admin/LoginForm';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/artwork/:id" element={<ArtworkPage />} />
      <Route path="/admin/login" element={<LoginForm />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/migrate"
        element={
          <ProtectedRoute>
            <MigratePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
