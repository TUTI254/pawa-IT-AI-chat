from fastapi import APIRouter, HTTPException
from app.schemas import QuestionRequest, AnswerResponse
from app.services import ask_llm

router = APIRouter()

# Define the API endpoints

#  this is a test endpoint to check if the API is running
@router.get("/api/health")
async def health_check():
    return {"status": "ok"}

# Endpoint to ask a question and get an answer from the LLM
@router.post("/api/ask", response_model=AnswerResponse)
async def ask_question(req: QuestionRequest):
    try:
        response = await ask_llm(req.question)
        return {"answer": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
