from pinecone import Pinecone
import os
import logging

logging.basicConfig(level=logging.INFO)

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index("docs")
namespace = "chatbot"

def load_documents_from_folder(folder_path="../docs"):
  records = []

  try:
    for filename in os.listdir(folder_path):
      if filename.endswith(".txt"):
        with open(os.path.join(folder_path, filename), "r", encoding="utf-8") as f:
          content = f.read()
          records.append({"_id": filename.removesuffix(".txt"), "text": content, "title": content.strip().split("\n")[0]})
          logging.info(f"{filename} added")

    index.upsert_records(namespace, records)
    logging.info(f"Documents upserted to pinecone vector database")
  except Exception as e:
    logging.exception(str(e))


load_documents_from_folder()

