import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3002/messages', {
          params: { page: currentPage, limit: 5 },
        });
        setMessages(response.data.messages);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {messages.length === 0 ? (
            <p>No messages found.</p>
          ) : (
            <ul className="space-y-4">
              {messages.map((msg) => (
                <li key={msg.id} className="p-4 bg-white shadow rounded">
                  <p className="font-semibold">{msg.name}</p>
                  <p className="text-gray-600">{msg.email}</p>
                  <p className="mt-2">{msg.message}</p>
                  <p className="mt-2">{msg.createdAt}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
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
