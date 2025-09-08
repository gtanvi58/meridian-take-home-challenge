"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

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
<div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md w-full max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
        Ask AI about your insights
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-gray-300 dark:focus:ring-gray-600"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <Button
          className="bg-gray-800 text-white hover:bg-black flex-shrink-0"
          onClick={handleAsk}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask"}
        </Button>
      </div>

      {answer && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-300 dark:border-gray-700 shadow-sm">
          <span className="font-semibold text-gray-800 dark:text-gray-200">Answer:</span>{" "}
          <span className="text-gray-700 dark:text-gray-300">{answer}</span>
        </div>
      )}
    </div>
  );
}
