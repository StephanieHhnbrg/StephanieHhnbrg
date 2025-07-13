# Chatbot Backend
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff)](#)
[![FastAPI](https://img.shields.io/badge/FastAPI-009485.svg?logo=fastapi&logoColor=white)](#)
[![Fly.io](https://img.shields.io/badge/Fly.io-000?logo=flydotio&logoColor=white)](#)
[![Groq](https://img.shields.io/badge/Groq-AI-FF6600?logo=groq&logoColor=fff)](#)

This is the backend for a chatbot powered by FastAPI and Groq API. \
It provides an `/ask` endpoint for querying questions, intended for the integration with the portfolio page.



## Local development
1. Set up the environment \
`cd backend` \
`python -m venv venv` \
`source venv/bin/activate` \
`pip install -r requirements.txt`


2. Get a Groq API key \
Create an account and generate an API key at https://console.groq.com/keys 


3. Run the application \
Start the server with your Groq API key as an environment variable: \
`GROQ_API_KEY=gsk_... uvicorn app.main:app --reload`


4. Test the endpoint 
- Open the interactive API docs at: http://127.0.0.1:8000/docs and send a request to the /ask endpoint
- or use curl to test from the command line:
``` 
  curl -X POST http://127.0.0.1:8000/ask \
    -H "Content-Type: application/json" \
    -d '{"question": "What is Stephanie's latest certification?"}'
```

For testing within a frontend integration, make sure http://localhost:4200 is listed in `allow_origins in [main.py](./app/main.py) to avoid CORS exceptions.


## Deploying to Fly.io
1. Install the Fly CLI \
`brew install flyctl` \
`fly auth login`


2. Initialize the app \
`cd backend` \
`fly launch`


3. Deploy \
`fly secrets set GROQ_API_KEY=gsk_...` \
`fly deploy`


4. Monitor \
App dashboard: https://fly.io/apps/chatbot-portfolio \
Live backend url: https://chatbot-portfolio.fly.dev
