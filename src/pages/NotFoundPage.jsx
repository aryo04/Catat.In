import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Nfp.css";

function NotFoundPage() {
  return (
    <div className="note-app__body">
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <p>Maaf, halaman yang Anda cari tidak tersedia.</p>
      <Link to="/">← Kembali ke Beranda</Link>
    </div>
  );
}

export default NotFoundPage;
