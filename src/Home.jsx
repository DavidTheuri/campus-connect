import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useAuth } from './AuthContext'; // Import auth context
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const { user } = useAuth(); // Check if user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to post!");
      return navigate('/login');
    }
    if (!content.trim()) return;
    
    await addDoc(collection(db, 'posts'), {
      content,
      category,
      author: user.email,
      authorId: user.uid,
      likes: 0,
      createdAt: new Date()
    });
    setContent('');
  };

  const handleDelete = async (id) => {
    if (!user) return navigate('/login');
    await deleteDoc(doc(db, 'posts', id));
  };

  const handleLike = async (id) => {
    if (!user) {
      alert("You must be logged in to like posts!");
      return navigate('/login');
    }
    await updateDoc(doc(db, 'posts', id), { likes: increment(1) });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => window.location.href = '/'}>
          Campus Connect
        </h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => navigate('/books')} className="text-sm text-blue-600 font-semibold">
            Find Books
          </button>
          {user ? (
            <button onClick={() => signOut(auth)} className="text-sm text-red-600">Logout</button>
          ) : (
            <button onClick={() => navigate('/login')} className="text-sm text-green-600 font-semibold">Login</button>
          )}
        </div>
      </div>

      <form onSubmit={handlePost} className="bg-white p-4 rounded shadow mb-4">
        <textarea 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          placeholder={user ? "Share something..." : "Log in to share something..."} 
          className="w-full border p-2 rounded" 
          rows="2" 
        />
        <div className="flex gap-2 mt-2">
          <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded">
            <option>General</option>
            <option>Study Group</option>
            <option>Resource</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Post</button>
        </div>
      </form>

      <div className="space-y-3">
        {posts.map(p => (
          <div key={p.id} className="bg-white p-3 rounded shadow">
            <p className="text-sm text-gray-500">{p.author} · {p.category}</p>
            <p>{p.content}</p>
            <div className="flex gap-3 mt-2">
              <button onClick={() => handleLike(p.id)} className="text-sm text-blue-600">Like ({p.likes || 0})</button>
              {user && p.authorId === user.uid && (
                <button onClick={() => handleDelete(p.id)} className="text-sm text-red-600">Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}