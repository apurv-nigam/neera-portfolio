import { useState, useEffect, useCallback } from 'react';
import { supabase, getPublicImageUrl } from '../lib/supabase';

export const useArtworks = (filter = 'all') => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArtworks = useCallback(async () => {
    setLoading(true);
    setError(null);

    let query = supabase
      .from('artworks')
      .select('*')
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (filter === 'featured') {
      query = query.eq('featured', true);
    } else if (filter === 'oil' || filter === 'watercolor') {
      query = query.eq('category', filter);
    }

    const { data, error: fetchError } = await query;

    if (fetchError) {
      setError(fetchError.message);
      setArtworks([]);
    } else {
      const transformed = data.map((artwork) => ({
        ...artwork,
        url: getPublicImageUrl(artwork.image_path),
        originalUrl: artwork.original_image_path
          ? getPublicImageUrl(artwork.original_image_path)
          : null,
      }));
      setArtworks(transformed);
    }

    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  return { artworks, loading, error, refetch: fetchArtworks };
};
