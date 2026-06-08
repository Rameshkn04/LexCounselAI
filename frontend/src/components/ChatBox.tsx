import { useState } from "react";
import API from "../services/api";

interface Message {
  type: "user" | "ai";
  text: string;
  source?: string;
}

function ChatBox() {
  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const askQuestion = async (
    customQuestion?: string
  ) => {

    const finalQuestion =
      customQuestion || question;

    if (!finalQuestion.trim()) {
      return;
    }

    const userMessage: Message = {
      type: "user",
      text: finalQuestion,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {

      const response = await API.get(
        "/documents/ask",
        {
          params: {
            question:
              finalQuestion,
          },
        }
      );

      const aiMessage: Message = {
        type: "ai",
        text: response.data.answer,
        source:
          response.data.source,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      setQuestion("");

    } catch (error) {

      console.error(error);

      const errorMessage: Message = {
        type: "ai",
        text: "Error getting response from server.",
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

      <div className="chat-history">

        {messages.length === 0 && (

          <div className="welcome-screen">

            <h1>
              ⚖️ Welcome to LexCounsel AI
            </h1>

            <p>
              Upload legal documents
              and ask questions.
            </p>

            <div className="suggestions">

              <button
                onClick={() =>
                  askQuestion(
                    "What is the termination clause?"
                  )
                }
              >
                What is the
                termination clause?
              </button>

              <button
                onClick={() =>
                  askQuestion(
                    "What is the salary?"
                  )
                }
              >
                What is the salary?
              </button>

              <button
                onClick={() =>
                  askQuestion(
                    "What is the probation period?"
                  )
                }
              >
                What is the
                probation period?
              </button>

              <button
                onClick={() =>
                  askQuestion(
                    "Are there confidentiality obligations?"
                  )
                }
              >
                Confidentiality
                obligations?
              </button>

            </div>

          </div>

        )}

        {messages.map(
          (message, index) => (

            <div
              key={index}
              className={
                message.type ===
                "user"
                  ? "user-message"
                  : "ai-message"
              }
            >

              <div className="message-header">

                {message.type ===
                "user"
                  ? "👤 You"
                  : "⚖️ LexCounsel AI"}

              </div>

              <div className="message-body">

                {message.text}

              </div>

              {message.source && (

                <div className="message-source">

                  📄 Source:
                  {" "}
                  {message.source}

                </div>

              )}

            </div>

          )
        )}

        {loading && (

          <div className="loading">

            ⚖️ Analyzing legal documents...

          </div>

        )}

      </div>

      <div className="chat-input">

        <input
          type="text"
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          placeholder="Ask anything about your legal documents..."
          onKeyDown={(e) => {
            if (
              e.key === "Enter"
            ) {
              askQuestion();
            }
          }}
        />

        <button
          onClick={() =>
            askQuestion()
          }
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