from sentence_transformers import SentenceTransformer
import chromadb
import os
import logging

logging.basicConfig(level=logging.INFO)
model = SentenceTransformer("all-mpnet-base-v2")
client = chromadb.PersistentClient(path="chroma_db")
# client = chromadb.Client()

collection = client.get_or_create_collection("docs")
# client.delete_collection("docs")

def load_documents_from_folder(folder_path="../docs"):
  documents = []
  for filename in os.listdir(folder_path):
    if filename.endswith(".txt"):
      with open(os.path.join(folder_path, filename), "r", encoding="utf-8") as f:
        content = f.read()
        documents.append(content)
  return documents

def ingest_once():
  docs = load_documents_from_folder()
  embeddings = model.encode(docs)
  for i, doc in enumerate(docs):
    collection.add(documents=[doc], ids=[f"doc{i}"], embeddings=[embeddings[i]])

try:
  ingest_once()
  logging.info(f"Documents ingested to collection")
except:
  pass

def get_RAG_context(question):
  logging.info(f"User Question: {question}")

  q_embed = model.encode([question], convert_to_numpy=True)[0]
  results = collection.query(query_embeddings=[q_embed], n_results=3)

  docs = results["documents"][0]
  first_lines = [doc.strip().split("\n")[0] for doc in docs]
  logging.info(f"Top Retrieved Docs: {first_lines}")

  context = "\n---\n".join(docs)
  return context
