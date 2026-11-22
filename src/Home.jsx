import React from 'react';
import { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await addDoc(collection(db, 'posts'), {
      content,
      category,
      author: auth.currentUser.email,
      authorId: auth.currentUser.uid,
      likes: 0,
      createdAt: new Date()
    });
    setContent('');
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'posts', id));
  };

  const handleLike = async (id) => {
    await updateDoc(doc(db, 'posts', id), { likes: increment(1) });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => window.location.href = '/'}>
          Campus Connect
        </h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => window.location.href = '/books'} className="text-sm text-blue-600 font-semibold">
            Find Books
          </button>
          <button onClick={() => signOut(auth)} className="text-sm text-red-600">
            Logout
          </button>
        </div>
      </div>

      <form onSubmit={handlePost} className="bg-white p-4 rounded shadow mb-4">
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Share something..." className="w-full border p-2 rounded" rows="2" />
        <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded mt-2">
          <option>General</option>
          <option>Study Group</option>
          <option>Resource</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded mt-2">Post</button>
      </form>

      <div className="space-y-3">
        {posts.map(p => (
          <div key={p.id} className="bg-white p-3 rounded shadow">
            <p className="text-sm text-gray-500">{p.author} · {p.category}</p>
            <p>{p.content}</p>
            <div className="flex gap-3 mt-2">
              <button onClick={() => handleLike(p.id)} className="text-sm text-blue-600">Like ({p.likes || 0})</button>
              {p.authorId === auth.currentUser?.uid && (
                <button onClick={() => handleDelete(p.id)} className="text-sm text-red-600">Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}