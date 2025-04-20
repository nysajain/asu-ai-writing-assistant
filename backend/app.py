from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from prewriting_bot import router as prewriting_router
from research_bot import router as research_router
from drafting_bot import router as drafting_router
from revising_bot import router as revising_router
from editing_bot import router as editing_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prewriting_router, prefix="/prewriting")
app.include_router(research_router, prefix="/research")
app.include_router(drafting_router, prefix="/drafting")
app.include_router(revising_router, prefix="/revising")
app.include_router(editing_router, prefix="/editing")
