from pinecone import Pinecone
import os
import logging

logging.basicConfig(level=logging.INFO)

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index("docs")
namespace = "chatbot"

def get_RAG_context(question):
  logging.info(f"User Question: {question}")

  results = index.search(
    namespace=namespace,
    query={
      "inputs": {"text": question},
      "top_k": 3
    },
    fields=["text"]
  )

  hits = results["result"]["hits"]
  docs = [hit["fields"]["text"] for hit in hits]
  ids = [hit["_id"] for hit in hits]
  logging.info(f"Top Retrieved Docs: {ids}")

  context = "\n---\n".join(docs)
  return context
