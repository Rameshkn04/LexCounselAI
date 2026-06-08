import { useState, useEffect, useRef } from "react";
import API from "../services/api";

interface Message {
  type: "user" | "ai";
  text: string;
  source?: string;
  time?: string;
}

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const getTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const askQuestion = async (
    customQuestion?: string
  ) => {
    const finalQuestion =
      customQuestion || question;

    if (!finalQuestion.trim()) return;

    const userMessage: Message = {
      type: "user",
      text: finalQuestion,
      time: getTime(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await API.get(
        "/documents/ask",
        {
          params: {
            question: finalQuestion,
          },
        }
      );

      const aiMessage: Message = {
        type: "ai",
        text: response.data.answer,
        source: response.data.source,
        time: getTime(),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } catch (error) {
      console.error(error);

      const errorMessage: Message = {
        type: "ai",
        text: "Error getting response from server.",
        time: getTime(),
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">

      <style>{`
        .message-time {
          margin-top: 10px;
          font-size: 13px;
          opacity: 0.7;
        }
      `}</style>

      {/* Header */}
      <div className="chat-header">
        <h1>LexCounsel AI Assistant</h1>
        <p>
          Ask anything about your legal documents
        </p>
      </div>

      {/* Chat History */}
      <div className="chat-history">

        {messages.length === 0 && (

          <div className="welcome-screen">

            <h1>
              ⚖️ Welcome to LexCounsel AI
            </h1>

            <p>
              Upload legal documents and ask
              questions instantly.
            </p>

            <div className="suggestions">

              <button
                onClick={() =>
                  askQuestion(
                    "What is the termination clause?"
                  )
                }
              >
                Termination Clause
              </button>

              <button
                onClick={() =>
                  askQuestion(
                    "What is the salary?"
                  )
                }
              >
                Salary
              </button>

              <button
                onClick={() =>
                  askQuestion(
                    "What is the probation period?"
                  )
                }
              >
                Probation Period
              </button>

              <button
                onClick={() =>
                  askQuestion(
                    "Are there confidentiality obligations?"
                  )
                }
              >
                Confidentiality
              </button>

            </div>

          </div>

        )}

        {messages.map((message, index) => (

          <div
            key={index}
            className={
              message.type === "user"
                ? "user-message"
                : "ai-message"
            }
          >

            <div className="message-header">

              {message.type === "user"
                ? "👤 You"
                : "⚖️ LexCounsel AI"}

            </div>

            <div className="message-body">
              {message.text}
            </div>

            {message.source && (

              <div className="message-source">
                📄 Source: {message.source}
              </div>

            )}

            <div className="message-time">
              {message.time}
            </div>

          </div>

        ))}

        {loading && (

          <div className="ai-message">

            <div className="message-header">
              ⚖️ LexCounsel AI
            </div>

            <div className="message-body">
              Analyzing legal documents...
            </div>

          </div>

        )}

        <div ref={bottomRef}></div>

      </div>

      {/* Input */}
      <div className="chat-input">

        <input
          type="text"
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          placeholder="Ask anything about your legal documents..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askQuestion();
            }
          }}
        />

        <button
          onClick={() => askQuestion()}
          disabled={loading}
        >
          {loading
            ? "Thinking..."
            : "Send"}
        </button>

      </div>

    </div>
  );
}

export default ChatBox;