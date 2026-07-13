import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getContacts,
  deleteContact,
  toggleReadStatus,
} from "../services/contactService";

function AdminMessages() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getContacts(token);
      setMessages(data.contacts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      const token = localStorage.getItem("token");

      await deleteContact(id, token);

      toast.success("Message deleted");

      fetchMessages();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await toggleReadStatus(id, token);

      fetchMessages();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Contact Messages
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-5 py-4 text-left">Name</th>
              <th className="px-5 py-4 text-left">Email</th>
              <th className="px-5 py-4 text-left">Subject</th>
              <th className="px-5 py-4 text-left">Date</th>
              <th className="px-5 py-4 text-left">Status</th>
              <th className="px-5 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((message) => (
              <tr
                key={message._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-5 py-4">
                  {message.name}
                </td>

                <td className="px-5 py-4">
                  {message.email}
                </td>

                <td className="px-5 py-4">
                  {message.subject}
                </td>
                <td className="px-5 py-4">
  {new Date(message.createdAt).toLocaleDateString("en-IN")}
</td>


                <td className="px-5 py-4">
                  {message.isRead ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Read
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      Unread
                    </span>
                  )}
                </td>

                <td className="px-5 py-4 space-x-2">
                  <button
                    onClick={() =>
                      alert(message.message)
                    }
                    className="bg-blue-600 text-white px-3 py-2 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      handleToggle(message._id)
                    }
                    className="bg-yellow-500 text-white px-3 py-2 rounded"
                  >
                    Toggle
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(message._id)
                    }
                    className="bg-red-600 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminMessages;