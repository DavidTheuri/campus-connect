import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Books() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10`);
      const data = await res.json();
      setBooks(data.docs || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Book Search</h1>
      <div className="flex gap-2">
        <input 
          value={query} 
          onChange={e => setQuery(e.target.value)} 
          placeholder="Search books..." 
          className="border p-2 rounded flex-1" 
        />
        <button onClick={search} className="bg-green-600 text-white px-4 rounded">
          Search
        </button>
      </div>
      
      {loading && <p className="mt-2">Loading...</p>}
      
      <div className="mt-4 space-y-2">
                {books.map((b, i) => (
          <Link 
            key={i} 
            to={`/book${b.key}`} 
            className="block bg-white p-3 rounded shadow hover:bg-blue-50 transition"
          >
            <p className="font-semibold text-blue-600">{b.title}</p>
            <p className="text-sm text-gray-600">{b.author_name?.join(', ') || 'Unknown author'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}