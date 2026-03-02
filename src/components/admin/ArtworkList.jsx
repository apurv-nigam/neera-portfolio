import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { supabase, getPublicImageUrl } from '../../lib/supabase';

const ArtworkList = ({ artworks, loading, onEdit, onDeleted }) => {
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (artwork) => {
    if (!confirm(`Delete "${artwork.title}"? This cannot be undone.`)) return;

    setDeleting(artwork.id);

    // Delete image from storage
    await supabase.storage
      .from('artwork-images')
      .remove([artwork.image_path]);

    // Delete record from database
    const { error } = await supabase
      .from('artworks')
      .delete()
      .eq('id', artwork.id);

    setDeleting(null);

    if (error) {
      alert('Failed to delete: ' + error.message);
    } else {
      onDeleted();
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-warm-gray-400">
        Loading artworks...
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="text-center py-12 text-warm-gray-400">
        No artworks yet. Add your first one!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {artworks.map((artwork) => (
        <div
          key={artwork.id}
          className="flex items-center gap-4 bg-white rounded-xl border border-warm-gray-100 p-4"
        >
          <img
            src={getPublicImageUrl(artwork.image_path)}
            alt={artwork.title}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-warm-gray-800 truncate">
              {artwork.title}
            </h3>
            <p className="text-sm text-warm-gray-400">
              {artwork.medium} · {artwork.year}
              {artwork.featured && (
                <span className="ml-2 inline-block px-2 py-0.5 bg-gold/20 text-gold text-xs rounded-full">
                  Featured
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onEdit(artwork)}
              className="p-2 text-warm-gray-400 hover:text-accent transition-colors"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(artwork)}
              disabled={deleting === artwork.id}
              className="p-2 text-warm-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtworkList;
