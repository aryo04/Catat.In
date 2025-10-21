import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddNotePage from './pages/AddNotePage';
import ArchivedNotesPage from './pages/ArchivedNotesPage';
import NoteDetailPage from './pages/NoteDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/notes/new" element={<ProtectedRoute><AddNotePage /></ProtectedRoute>} />
        <Route path="/archived" element={<ProtectedRoute><ArchivedNotesPage /></ProtectedRoute>} />
        <Route path="/notes/:id" element={<ProtectedRoute><NoteDetailPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
