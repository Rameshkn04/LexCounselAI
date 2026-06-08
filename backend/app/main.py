from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine
from app.models.base import Base

from app.models.user import User
from app.models.document import Document

from app.api.auth import router as auth_router
from app.api.document import router as document_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LexCounsel AI",
    version="1.0.0"
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "https://lex-counsel-ai-kecs.vercel.app",
    "https://lex-counsel-ai-kecs-git-main-rameshkn04s-projects.vercel.app",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(document_router)

@app.get("/")
def home():
    return {"message": "LexCounsel AI Backend Running"}

@app.get("/health")
def health():
    return {"status": "ok"}