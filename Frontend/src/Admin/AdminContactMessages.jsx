import React, { useState, useEffect } from "react";
import api from "../apicall/axios";
import { toast } from "react-toastify";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, unread, replied
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get("/admin/contact-messages/");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      toast.error("Failed to load contact messages");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`/admin/contact-messages/${id}/`, { is_read: true });
      setMessages(
        messages.map((msg) =>
          msg.id === id ? { ...msg, is_read: true } : msg
        )
      );
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, is_read: true });
      }
      toast.success("Marked as read");
    } catch (error) {
      console.error("Error marking as read:", error);
      toast.error("Failed to mark as read");
    }
  };

  const handleMarkAsReplied = async (id) => {
    try {
      await api.patch(`/admin/contact-messages/${id}/`, {
        replied: true,
        is_read: true,
      });
      setMessages(
        messages.map((msg) =>
          msg.id === id ? { ...msg, replied: true, is_read: true } : msg
        )
      );
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, replied: true, is_read: true });
      }
      toast.success("Marked as replied");
    } catch (error) {
      console.error("Error marking as replied:", error);
      toast.error("Failed to mark as replied");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      await api.delete(`/admin/contact-messages/${id}/`);
      setMessages(messages.filter((msg) => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      toast.success("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === "unread") return !msg.is_read;
    if (filter === "replied") return msg.replied;
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const unreadCount = messages.filter((msg) => !msg.is_read).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Contact Messages
              </h1>
              <p className="text-gray-600 mt-1">
                Manage customer inquiries and feedback
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Messages</div>
              <div className="text-3xl font-bold text-indigo-600">
                {messages.length}
              </div>
              {unreadCount > 0 && (
                <div className="mt-1 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {unreadCount} Unread
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({messages.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "unread"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter("replied")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "replied"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Replied ({messages.filter((m) => m.replied).length})
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages List Column */}
          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500 text-lg">No messages found</p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`bg-white rounded-lg shadow-md p-5 cursor-pointer transition-all hover:shadow-lg ${
                    selectedMessage?.id === message.id
                      ? "ring-2 ring-indigo-500"
                      : ""
                  } ${!message.is_read ? "border-l-4 border-indigo-500" : ""}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                        {message.name}
                        {!message.is_read && (
                          <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                        {message.replied && (
                          <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                            ✓ Replied
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 line-clamp-2 mb-3">
                    {message.message}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{formatDate(message.created_at)}</span>
                    <span className="text-indigo-600 font-medium">
                      Click to view details →
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Detail Column */}
          <div className="lg:sticky lg:top-6 h-fit">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Message Details
                  </h2>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Sender Info */}
                  <div className="border-b pb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-semibold text-gray-800">
                          {selectedMessage.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                          {selectedMessage.email}
                        </a>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-500">Received</p>
                      <p className="font-semibold text-gray-800">
                        {formatDate(selectedMessage.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Message</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-800 whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex gap-2">
                    {!selectedMessage.is_read && (
                      <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                        Unread
                      </span>
                    )}
                    {selectedMessage.replied && (
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                        Replied
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-center font-medium"
                    >
                      📧 Reply via Email
                    </a>
                  </div>

                  <div className="flex gap-3">
                    {!selectedMessage.is_read && (
                      <button
                        onClick={() => handleMarkAsRead(selectedMessage.id)}
                        className="flex-1 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                      >
                        Mark as Read
                      </button>
                    )}
                    {!selectedMessage.replied && (
                      <button
                        onClick={() => handleMarkAsReplied(selectedMessage.id)}
                        className="flex-1 bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors font-medium"
                      >
                        Mark as Replied
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="w-full bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors font-medium"
                  >
                    🗑 Delete Message
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">📬</div>
                <p className="text-gray-500 text-lg">
                  Select a message to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContactMessages;
