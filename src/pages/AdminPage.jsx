import { useState } from 'react';
import { Plus } from 'lucide-react';
import AdminHeader from '../components/admin/AdminHeader';
import ArtworkForm from '../components/admin/ArtworkForm';
import ArtworkList from '../components/admin/ArtworkList';
import { useArtworks } from '../hooks/useArtworks';

const AdminPage = () => {
  const { artworks, loading, refetch } = useArtworks('all');
  const [showForm, setShowForm] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);

  const handleEdit = (artwork) => {
    setEditingArtwork(artwork);
    setShowForm(true);
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditingArtwork(null);
    refetch();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingArtwork(null);
  };

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader />

      <main className="max-w-5xl mx-auto px-6 py-8">
        {showForm ? (
          <ArtworkForm
            artwork={editingArtwork}
            onSaved={handleSaved}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-warm-gray-800">
                Artworks ({artworks.length})
              </h2>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add New
              </button>
            </div>
            <ArtworkList
              artworks={artworks}
              loading={loading}
              onEdit={handleEdit}
              onDeleted={refetch}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
