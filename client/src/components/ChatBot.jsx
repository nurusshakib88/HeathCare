import React, { useState, useRef, useEffect } from "react";
import { Send } from "@mui/icons-material";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "This is your friendly chatbot 😀",
      sender: "bot",
    },
    {
      id: 2,
      text: "How Can I Help you?",
      sender: "bot",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const chatboxRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (inputText.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    // Scroll to the bottom of the chatbox whenever messages change
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const renderMessages = () => {
    return messages.map((message, index) => (
      <div
        key={message.id}
        className={`chat  ${
          message.sender === "bot" ? "chat-start" : "chat-end"
        }`}
      >
        <div className="chat-bubble bg-secondary text-black">
          {message.text}
        </div>
      </div>
    ));
  };

  return (
    <div className="px-32 h-[76.28vh] flex items-center">
      <div
        className="chatbox px-20 py-10 w-full h-[90%] flex flex-col justify-end bg-primary rounded-xl "
        ref={chatboxRef}
      >
        <div className="overflow-y-auto h-max">{renderMessages()}</div>{" "}
        <form
          onSubmit={handleSendMessage}
          className="flex items-center mt-5 gap-3"
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn bg-secondary text-black">
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
