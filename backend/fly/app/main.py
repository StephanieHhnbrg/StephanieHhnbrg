from fastapi import FastAPI, Request
from pydantic import BaseModel
from app.rag_engine import get_RAG_context
from app.prompt_executor import query_llm
from fastapi.middleware.cors import CORSMiddleware
import os

LOCAL_RUN = os.getenv("LOCAL_RUN", "false").lower() == "true"
allow_origins = (
  ["http://localhost:4200"]
  if LOCAL_RUN
  else ["https://stephaniehhnbrg.github.io"]
)

app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  allow_origins=allow_origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


class Query(BaseModel):
  question: str


@app.get("/healthz")
def health_check():
  return {"status": "ok"}


@app.post("/ask")
async def ask(query: Query):
  context = get_RAG_context(query.question)
  answer = query_llm(context, query.question)
  return {"answer": answer}
