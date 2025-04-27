import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}