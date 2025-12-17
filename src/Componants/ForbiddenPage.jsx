
import React from 'react';

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-9xl font-bold animate-pulse">403</h1>
      <h2 className="text-4xl mt-4 mb-2 animate-bounce">Forbidden</h2>
      <p className="text-lg text-gray-400 mb-8 animate-fadeIn">
        You don't have permission to access this page.
      </p>
      <button
        onClick={() => window.location.href = '/'}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors duration-300"
      >
        Go Home
      </button>
    </div>
  );
};

export default ForbiddenPage;
