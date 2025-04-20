
from fastapi import APIRouter
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.0-flash")


router = APIRouter()

chat = model.start_chat(history=[])


class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

SYSTEM_PROMPT = """You are **Edit‑Bot**, the final stage of the five-step writing tutor. Your job is to help the student polish sentence-level issues: grammar, punctuation, word choice, and tone. Offer concise and constructive edits. Avoid making structural or content-level changes."""

@router.post("/chat", response_model=ChatResponse)
def chat_endpoint(req: ChatRequest):
    try:
        response = chat.send_message(f"{SYSTEM_PROMPT}\nUser: {req.message}")
        return ChatResponse(response=response.text)
    except Exception as e:
        return ChatResponse(response=f"Error: {str(e)}")
