import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookDetails() {
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // 1. Get the current URL (e.g., http://localhost:5173/book/works/OL123W)
        const currentUrl = window.location.href;
        
        // 2. Grab everything after "/book" (e.g., /works/OL123W)
        const bookKey = currentUrl.split('/book')[1]; 
        
        if (!bookKey) throw new Error("No book ID found in URL");

        // 3. Fetch the data from Open Library
        const res = await fetch(`https://openlibrary.org${bookKey}.json`);
        if (!res.ok) throw new Error("Book data not found");
        
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
      setLoading(false);
    };
    fetchBookDetails();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading book details...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  if (!book) return <div className="p-8 text-center">Book not found.</div>;

  const description = typeof book.description === 'string' 
    ? book.description 
    : book.description?.value || 'No description available for this book.';

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <button 
        onClick={() => navigate('/books')} 
        className="mb-4 text-blue-600 font-semibold hover:underline"
      >
        ← Back to Search
      </button>

      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
        
        {book.subjects && (
          <p className="text-sm text-gray-500 mb-4">
            Subjects: {book.subjects.slice(0, 5).join(', ')}
          </p>
        )}

        <div className="text-gray-700 mt-4">
          <h2 className="font-semibold text-lg mb-2">Description</h2>
          <p className="leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}