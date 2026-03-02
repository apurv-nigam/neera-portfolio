import { LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader = () => {
  const { signOut } = useAuth();

  return (
    <header className="bg-white border-b border-warm-gray-100 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="font-serif text-xl font-bold text-warm-gray-800">
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-warm-gray-500 hover:text-accent transition-colors"
          >
            View Site <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 text-sm text-warm-gray-500 hover:text-red-500 transition-colors"
          >
            Logout <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
