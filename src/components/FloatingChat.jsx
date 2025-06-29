import { FaComments } from "react-icons/fa";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:9000"); // your backend socket server

const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! I’m Soumya’s Assistant. How can I help you today?", sender: "bot" },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on("bot-response", (reply) => {
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
      setLoading(false);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection failed:", err);
    });

    return () => {
      socket.off("bot-response");
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    socket.emit("user-message", input);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-indigo-700"
      >
        <FaComments size={20} />
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white text-black p-4 rounded-xl shadow-xl z-50 flex flex-col max-h-[75vh]">
          <div className="overflow-y-auto mb-3 pr-1 h-60">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 text-sm p-2 rounded ${
                  msg.sender === "user"
                    ? "bg-indigo-100 text-right ml-auto"
                    : "bg-gray-100 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-xs text-gray-500 italic">Typing...</div>}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2 mt-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 text-sm rounded border border-gray-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-pink-600 text-white px-3 py-2 text-sm rounded hover:bg-pink-700"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingChat;