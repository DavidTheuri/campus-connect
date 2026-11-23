import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function BookDetails() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // We ask Open Library for the specific details of this book ID
        const res = await fetch(`https://openlibrary.org${bookId}.json`);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchBookDetails();
  }, [bookId]);

  if (loading) return <div className="p-8 text-center">Loading book details...</div>;
  if (!book) return <div className="p-8 text-center">Book not found.</div>;

  // Open Library stores descriptions in a few different ways. This handles them all.
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