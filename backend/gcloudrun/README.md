# Chatbot Backend
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff)](#)
[![Groq](https://img.shields.io/badge/Groq-AI-FF6600?logo=groq&logoColor=fff)](#)

This is the backend for a chatbot powered by Flask, PineCone and Groq API. \
It provides an `/ask` endpoint for querying questions, intended for the integration with the portfolio page.


## Local development
1. Set up the environment \
`cd backend/gcloudrun` \
`python -m venv venv` \
`source venv/bin/activate` \
`pip install -r requirements.txt`


2. Get the API keys \
Create an account and generate an API key at https://console.groq.com/keys 


3. Run the application \
Start the server with your Groq API key as an environment variable: \
`export FLASK_APP=main:app`
`export GROQ_API_KEY=gsk_...`
`export PINECONE_API_KEY=pcsk_...`
`LOCAL_RUN=true flask run --port 8000 --reload`


4. Test the endpoint 
- Use curl to test from the command line:
``` 
  curl -X POST http://127.0.0.1:8000/ask \
    -H "Content-Type: application/json" \
    -d '{"question": "What is Stephanie's latest certification?"}'
```

For testing within a frontend integration, make sure http://localhost:4200 is listed in `allow_origins in [main.py](./app/main.py) to avoid CORS exceptions.


## Deploying to GCloudRun
