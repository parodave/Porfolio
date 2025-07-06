import { useState } from 'react';
import { uploadFile } from '../s3Service';

interface Metadata {
  title: string;
  description: string;
  content: string;
}

const AdminUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<Metadata>({
    title: '',
    description: '',
    content: ''
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    try {
      setUploading(true);
      setError('');
      const key = `${Date.now()}_${file.name}`;
      const uploadedUrl = await uploadFile(file, key);
      setUrl(uploadedUrl);
    } catch (err) {
      console.error(err);
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="min-h-screen p-6 bg-dark text-white">
      <h1 className="text-2xl font-bold mb-4">Admin Upload</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block mb-1" htmlFor="file">File</label>
          <input id="file" type="file" onChange={handleFileChange} className="w-full" />
        </div>
        <div>
          <label className="block mb-1" htmlFor="title">Title</label>
          <input id="title" name="title" value={metadata.title} onChange={handleChange} className="w-full bg-dark border border-gray-700 p-2" />
        </div>
        <div>
          <label className="block mb-1" htmlFor="description">Description</label>
          <input id="description" name="description" value={metadata.description} onChange={handleChange} className="w-full bg-dark border border-gray-700 p-2" />
        </div>
        <div>
          <label className="block mb-1" htmlFor="content">Content (Markdown)</label>
          <textarea id="content" name="content" rows={6} value={metadata.content} onChange={handleChange} className="w-full bg-dark border border-gray-700 p-2" />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {url && <p className="text-green-500">Uploaded to {url}</p>}
        <button type="submit" disabled={uploading} className="px-4 py-2 border border-white disabled:opacity-75">
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </section>
  );
};

export default AdminUpload;
