import functions_framework
import os
from flask import Flask, request, jsonify, make_response

app = Flask(__name__)
from application.rag_engine import get_RAG_context
from application.prompt_executor import query_llm
from application.firebase_logger import log_message_to_firebase

LOCAL_RUN = os.getenv("LOCAL_RUN", "false").lower() == "true"
ALLOWED_ORIGINS = (
  ["http://localhost:4200"]
  if LOCAL_RUN
  else ["https://stephaniehhnbrg.github.io"]
)

@app.route("/ask", methods=["POST", "OPTIONS"])  #local dev
# @functions_framework.http # gcloudrun
def ask():
  if request.method == 'OPTIONS':
    return handle_cors(request)

  question = request.json.get('question')
  if LOCAL_RUN is False:
    log_message_to_firebase(question)
  context = get_RAG_context(question)
  answer = query_llm(context, question)

  return create_response(request, {"answer": answer})



def get_allowed_origin(request):
  origin = request.headers.get('Origin', '')
  if origin in ALLOWED_ORIGINS:
    return origin
  return ALLOWED_ORIGINS[0]


def handle_cors(request):
  response = make_response()
  response.status_code = 204
  response.headers['Access-Control-Allow-Origin'] = get_allowed_origin(request)
  response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
  return response


def create_response(request, data):
  response = make_response(jsonify(data))
  response.status_code = 200
  response.headers['Access-Control-Allow-Origin'] = get_allowed_origin(request)
  return response

