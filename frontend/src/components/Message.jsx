import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3002/messages', {
          params: { page: currentPage, limit: 5 },
        });
        setMessages(response.data.messages);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError('Error fetching messages. Please try again later.');
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Messages</h2>

      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-white">No messages found.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li key={msg.id} className="p-4 bg-gray-800 shadow rounded-lg">
                <p className="font-semibold text-lg text-white">{msg.name}</p>
                <p className="text-gray-400">{msg.email}</p>
                <p className="mt-2 text-white">{msg.message}</p>
                <p className="mt-2 text-sm text-gray-500">{new Date(msg.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="self-center text-black">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
