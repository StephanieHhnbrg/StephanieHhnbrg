from google.cloud import firestore

def log_message_to_firebase(message):
  db = firestore.Client(database='chatbot')
  db.collection('user-messages').add({
    'question': message,
    'askedAt': firestore.SERVER_TIMESTAMP
  })
