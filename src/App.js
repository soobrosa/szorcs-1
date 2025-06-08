// Google Gemini
// 

import React, { useState } from 'react';

// Main App component
function App() {
  // State for the search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');

  // Predefined list of domains to search within
  // This list has been updated with the domains you provided.
  const domains = [
    'chiliesvanilia.hu',
    'buvosszakacs.com',
    'magyarnarancs.hu',
    'es.hu',
    'streetkitchen.hu',
    'www.youtube.com/@mateszabikonyhaja', // Note: For YouTube channels, Google's site: operator might behave differently
    'www.youtube.com/@SzokyKonyhaja',    // and might not perfectly filter to just the channel.
    'www.youtube.com/@UncleJohnsCooking'
  ];

  /**
   * Handles changes in the search input field.
   * @param {Object} event - The input change event.
   */
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Generates a single Google search URL that combines the search term
   * with all predefined domains using the 'site:' and 'OR' operators.
   * This opens a single aggregated search results page on Google.
   */
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      // If search term is empty, do nothing or show a message
      console.log("Search term is empty.");
      return;
    }

    // Encode the base search term
    const encodedSearchTerm = encodeURIComponent(searchTerm);

    // Construct the 'site:domain' parts for each domain, joined by 'OR'
    // Ensure each part is properly encoded.
    // For YouTube channels, we'll use the full URL as provided.
    const domainSearchString = domains
      .map(domain => `site:${encodeURIComponent(domain)}`)
      .join(' OR ');

    // Combine the search term and domain string for the final URL
    // Ensure the entire query parameter is properly encoded
    const finalQuery = `${encodedSearchTerm} ${domainSearchString}`;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(finalQuery)}`;

    // Open the single aggregated search URL in a new tab
    window.open(googleSearchUrl, '_blank', 'noopener noreferrer');
  };

  // Optional: Trigger search on Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    // Main container with responsive padding and centering
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* Card-like container for the application content */}
      <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
        {/* Application Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-tight">
          Aggregated Domain Search
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-prose mx-auto">
          Enter your query below. A single Google search will be performed across
          the predefined domains, and results will appear in a new tab.
        </p>

        {/* Search Input and Button Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress} // Listen for Enter key
            placeholder="e.g., 'Hungarian goulash recipe'"
            className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 text-base"
            aria-label="Search query input"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition duration-150 ease-in-out active:scale-95"
            aria-label="Perform aggregated search"
          >
            Search All Domains
          </button>
        </div>

        {/* Note about how the search works */}
        <p className="text-center text-sm text-gray-500 mt-4 italic">
          This will open a single Google search tab with results aggregated from:
          <br />
          <span className="font-semibold text-xs leading-relaxed">{domains.join(', ')}</span>
        </p>
      </div>
    </div>
  );
}

export default App; // Export the App component as default
