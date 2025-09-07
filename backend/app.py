from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path
from transformers import pipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

data_file = Path(__file__).resolve().parents[1] / "data" / "mock-insights.json"

with open(data_file, "r") as f:
    insights = json.load(f)

context = "\n".join([
    f"Title: {i['title']}. Category: {i['category']}. Priority: {i['priority']}. Suggested action: {i['suggestedAction']}. Date: {i['date']}."
    for i in insights
])

generator = pipeline("text2text-generation", model="google/flan-t5-base")

@app.post("/ask")
async def ask(question: dict):
    q = question.get("question", "")
    if not q:
        return {"answer": "No question provided."}

    prompt = f"Given the context:\n{context}\n\nAnswer the following question based on the context: {q}"
    result = generator(prompt, max_length=256, do_sample=True)
    return {"answer": result[0]["generated_text"]}
