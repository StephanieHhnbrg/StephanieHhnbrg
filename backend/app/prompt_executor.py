import requests
import os
from fastapi import HTTPException
import logging

logging.basicConfig(level=logging.INFO)
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

SYSTEM_PROMPT = """You are an intelligent chatbot on Stephanie Hohenberg's personal website.
    Your role is to answer questions from recruiters and IT professionals based on the provided documents.
    These documents contain information about Stephanie’s background, skills, projects, achievements, and career highlights.

    Use only the information from the context below to answer the user's question clearly and professionally.
    If the answer is not found in the documents, say so honestly instead of guessing.
    Keep your responses concise, informative, and recruiter-friendly
"""

def query_llm(context, question):
  if GROQ_API_KEY:
    return query_groq(context, question)
  else:
    raise HTTPException(
      status_code=401,
      detail="LLM not available: GROQ_API_KEY is not set."
    )


def query_groq(context, question, model="llama-3.1-8b-instant"):
  headers = {
    "Authorization": f"Bearer {GROQ_API_KEY}",
    "Content-Type": "application/json"
  }

  prompt = f"""
    Context:
    {context}

    User Question: {question}
    """

  logging.info("Prompting Groq")

  response = requests.post(
    "https://api.groq.com/openai/v1/chat/completions",
    headers=headers,
    json={
      "model": model,
      "messages": [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": prompt}
      ],
      "temperature": 0.6
    }
  )
  json_data = response.json()

  logging.info(f"Receiving response: {json_data}")

  if "error" in json_data:
    raise HTTPException(
      status_code=503,
      detail=json_data["error"]["message"]
    )
  else:
    return json_data["choices"][0]["message"]["content"]
