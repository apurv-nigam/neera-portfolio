import { useState } from 'react';
import { supabase } from '../lib/supabase';
import artworks from '../data/artworks';

const MigratePage = () => {
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);

  const addLog = (msg) => setLog((prev) => [...prev, msg]);

  const migrate = async () => {
    setRunning(true);
    setLog([]);
    addLog('Starting migration...');

    for (const artwork of artworks) {
      try {
        addLog(`Processing: ${artwork.title}`);

        // Fetch the image from the public folder
        const response = await fetch(artwork.url);
        const blob = await response.blob();

        // Generate a filename from the original path
        const originalName = artwork.url.split('/').pop();
        const fileName = `migrated-${originalName}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('artwork-images')
          .upload(fileName, blob, {
            contentType: blob.type,
            upsert: true,
          });

        if (uploadError) {
          addLog(`  ⚠ Upload failed: ${uploadError.message}`);
          continue;
        }

        addLog(`  ✓ Image uploaded: ${fileName}`);

        // Insert into database
        const { error: insertError } = await supabase.from('artworks').insert({
          title: artwork.title,
          description: artwork.description,
          medium: artwork.medium,
          category: artwork.category,
          size: artwork.size,
          surface: artwork.surface,
          year: artwork.year,
          featured: artwork.featured,
          image_path: fileName,
        });

        if (insertError) {
          addLog(`  ⚠ DB insert failed: ${insertError.message}`);
          continue;
        }

        addLog(`  ✓ DB record created`);
      } catch (err) {
        addLog(`  ✗ Error: ${err.message}`);
      }
    }

    addLog('Migration complete!');
    setRunning(false);
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl font-bold text-warm-gray-800 mb-2">
          Data Migration
        </h1>
        <p className="text-warm-gray-500 mb-6">
          Migrates the {artworks.length} hardcoded artworks to Supabase (Storage + Database).
        </p>

        <button
          onClick={migrate}
          disabled={running}
          className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 mb-6"
        >
          {running ? 'Migrating...' : 'Start Migration'}
        </button>

        {log.length > 0 && (
          <div className="bg-warm-gray-800 text-warm-gray-100 rounded-xl p-4 font-mono text-sm max-h-[60vh] overflow-y-auto">
            {log.map((line, i) => (
              <div key={i} className="py-0.5">
                {line}
              </div>
            ))}
          </div>
        )}

        <p className="mt-6 text-sm text-warm-gray-400">
          <a href="/admin" className="text-accent hover:underline">← Back to Admin</a>
        </p>
      </div>
    </div>
  );
};

export default MigratePage;
