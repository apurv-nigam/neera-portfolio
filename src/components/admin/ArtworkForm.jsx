import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase, getPublicImageUrl } from '../../lib/supabase';

const CATEGORIES = [
  { value: 'oil', label: 'Oil Colors' },
  { value: 'watercolor', label: 'Watercolor' },
];

const ArtworkForm = ({ artwork, onSaved, onCancel }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    medium: '',
    category: 'oil',
    size: '',
    surface: '',
    year: new Date().getFullYear().toString(),
    featured: false,
    display_order: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const isEditing = !!artwork;

  useEffect(() => {
    if (artwork) {
      setForm({
        title: artwork.title,
        description: artwork.description,
        medium: artwork.medium,
        category: artwork.category,
        size: artwork.size,
        surface: artwork.surface,
        year: artwork.year,
        featured: artwork.featured,
        display_order: artwork.display_order ?? '',
      });
      setImagePreview(getPublicImageUrl(artwork.image_path));
      if (artwork.original_image_path) {
        setOriginalPreview(getPublicImageUrl(artwork.original_image_path));
      }
    }
  }, [artwork]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleOriginalChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalFile(file);
    setOriginalPreview(URL.createObjectURL(file));
  };

  const removeOriginal = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      let imagePath = artwork?.image_path;
      let originalImagePath = artwork?.original_image_path ?? null;

      // Upload new image if selected
      if (imageFile) {
        const ext = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from('artwork-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // Delete old image if editing
        if (artwork?.image_path) {
          await supabase.storage
            .from('artwork-images')
            .remove([artwork.image_path]);
        }

        imagePath = fileName;
      }

      // Upload original reference image if selected
      if (originalFile) {
        const ext = originalFile.name.split('.').pop();
        const fileName = `original-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from('artwork-images')
          .upload(fileName, originalFile);

        if (uploadError) throw uploadError;

        // Delete old original if editing
        if (artwork?.original_image_path) {
          await supabase.storage
            .from('artwork-images')
            .remove([artwork.original_image_path]);
        }

        originalImagePath = fileName;
      }

      // Handle removal of original (preview cleared but no new file)
      if (!originalPreview && artwork?.original_image_path) {
        await supabase.storage
          .from('artwork-images')
          .remove([artwork.original_image_path]);
        originalImagePath = null;
      }

      if (!imagePath) {
        throw new Error('Please select an image');
      }

      const record = {
        title: form.title,
        description: form.description,
        medium: form.medium,
        category: form.category,
        size: form.size,
        surface: form.surface,
        year: form.year,
        featured: form.featured,
        image_path: imagePath,
        original_image_path: originalImagePath,
        display_order: form.display_order === '' ? null : Number(form.display_order),
      };

      if (isEditing) {
        const { error: updateError } = await supabase
          .from('artworks')
          .update(record)
          .eq('id', artwork.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('artworks')
          .insert(record);
        if (insertError) throw insertError;
      }

      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-warm-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-bold text-warm-gray-800">
          {isEditing ? 'Edit Artwork' : 'Add New Artwork'}
        </h2>
        <button onClick={onCancel} className="text-warm-gray-400 hover:text-warm-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium text-warm-gray-600 mb-1">
            Image {!isEditing && '*'}
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-w-xs h-48 object-cover rounded-lg mb-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-warm-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
          />
        </div>

        {/* Original reference image (optional) */}
        <div>
          <label className="block text-sm font-medium text-warm-gray-600 mb-1">
            Original Reference Image
          </label>
          <p className="text-xs text-warm-gray-400 mb-2">
            If this artwork was painted from a photo, upload the original here. Visitors can swipe to compare.
          </p>
          {originalPreview && (
            <div className="relative inline-block mb-2">
              <img
                src={originalPreview}
                alt="Original preview"
                className="w-full max-w-xs h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeOriginal}
                className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {!originalPreview && (
            <input
              type="file"
              accept="image/*"
              onChange={handleOriginalChange}
              className="block w-full text-sm text-warm-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
            />
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-warm-gray-600 mb-1">Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-warm-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-warm-gray-600 mb-1">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg border border-warm-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
          />
        </div>

        {/* Category & Medium — side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-warm-gray-600 mb-1">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-warm-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-gray-600 mb-1">Medium *</label>
            <input
              name="medium"
              value={form.medium}
              onChange={handleChange}
              required
              placeholder="e.g. Oil Colors"
              className="w-full px-4 py-2.5 rounded-lg border border-warm-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>

        {/* Size & Surface */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-warm-gray-600 mb-1">Size *</label>
            <input
              name="size"
              value={form.size}
              onChange={handleChange}
              required
              placeholder="e.g. 24x36 inches"
              className="w-full px-4 py-2.5 rounded-lg border border-warm-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-gray-600 mb-1">Surface *</label>
            <input
              name="surface"
              value={form.surface}
              onChange={handleChange}
              required
              placeholder="e.g. Canvas"
              className="w-full px-4 py-2.5 rounded-lg border border-warm-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>

        {/* Year & Display Order */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-warm-gray-600 mb-1">Year *</label>
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-warm-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-gray-600 mb-1">Display Order</label>
            <input
              name="display_order"
              value={form.display_order}
              onChange={handleChange}
              type="number"
              placeholder="Optional"
              className="w-full px-4 py-2.5 rounded-lg border border-warm-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>

        {/* Featured */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
            className="w-4 h-4 rounded border-warm-gray-300 text-accent focus:ring-accent/50"
          />
          <span className="text-sm text-warm-gray-600">Featured on homepage</span>
        </label>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : isEditing ? 'Update Artwork' : 'Add Artwork'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-warm-gray-200 rounded-lg text-warm-gray-600 hover:bg-warm-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtworkForm;
