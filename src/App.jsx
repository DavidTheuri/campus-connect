import React from 'react';
import BookDetails from './BookDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import Home from './Home';
import Books from './Books';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/*" element={<BookDetails />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;