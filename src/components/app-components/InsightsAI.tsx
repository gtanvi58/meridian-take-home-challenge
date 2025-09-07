"use client";

import { useState } from "react";
import mockData from "../../../data/mock-insights.json";

export default function InsightsAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

const handleAsk = async () => {
  if (!question) return;
  setLoading(true);

  try {
    const res = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer);
  } catch (err) {
    console.error(err);
    setAnswer("Error processing question.");
  }

  setLoading(false);
};

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-6 w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200 text-center">
        Ask AI about your insights
      </h2>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700"
          onClick={handleAsk}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
      {answer && (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-300 dark:border-gray-700 mt-2">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}
