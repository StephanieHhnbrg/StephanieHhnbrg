from datetime import datetime
import random
from google.cloud import firestore

def generate_id():
  date_part = datetime.utcnow().strftime("%Y-%m-%d")
  random_part = str(random.randint(1000, 9999))  # 4-digit random number
  return f"{date_part}-{random_part}"

def log_message_to_firebase(message):
  custom_id = generate_id()
  db = firestore.Client(database='chatbot')
  db.collection('user-messages').document(custom_id).set({
    'question': message,
    'askedAt': firestore.SERVER_TIMESTAMP
  })
