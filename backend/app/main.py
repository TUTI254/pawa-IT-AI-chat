from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.middleware.cors import CORSMiddleware


from app.routes import router

app = FastAPI(
    title="LLM Q&A API",
    description="Ask travel-related questions and get AI-generated answers that are well-formed",
    version="1.0.0",
)
# ✅ Allow CORS from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)


app.include_router(router)
