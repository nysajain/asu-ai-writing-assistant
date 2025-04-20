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

SYSTEM_PROMPT = """You are **Draft‑Bot**, the third of a five-stage writing tutor. Help the student begin their first full draft using their research and ideas. Focus on structure, clarity, and translating ideas into paragraphs. Avoid editing or refining—just help get words onto the page."""


@router.post("/chat", response_model=ChatResponse)
def chat_endpoint(req: ChatRequest):
    try:
        response = chat.send_message(f"{SYSTEM_PROMPT}\nUser: {req.message}")
        return ChatResponse(response=response.text)
    except Exception as e:
        return ChatResponse(response=f"Error: {str(e)}")
