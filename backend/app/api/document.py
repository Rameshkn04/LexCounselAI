from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends

from sqlalchemy.orm import Session

import os

from app.core.dependencies import get_db

from app.services.pdf_service import extract_pdf_text
from app.services.chunk_service import chunk_text
from app.services.file_service import save_file

from app.services.embedding_service import (
    generate_embeddings
)

from app.services.vector_store import (
    add_chunks,
    search_chunks
)

from app.services.gemini_service import(
    generate_answer
)

from app.services.document_service import (
    create_document,
    get_all_documents
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

from fastapi import HTTPException
from app.models.document import Document


# -------------------------
# Upload Document
# -------------------------

@router.post("/upload")
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # Save file
    path = save_file(file)

    existing = db.query(Document).filter(Document.filename == file.filename).first()

    if existing:
        return {
        "message": "Document already uploaded",
        "document_id": existing.id,
        "filename": existing.filename
    }
    # Save metadata in PostgreSQL
    document = create_document(
        db=db,
        filename=file.filename,
        filepath=path
    )

    # Extract text
    text = extract_pdf_text(path)

    # Chunk text
    chunks = chunk_text(text)

    # Generate embeddings
    embeddings = generate_embeddings(chunks)

    # Store in ChromaDB
    add_chunks(
        chunks,
        embeddings,
        file.filename
    )

    return {
        "message": "Document uploaded and indexed successfully",
        "document_id": document.id,
        "filename": document.filename
    }


# -------------------------
# List Documents
# -------------------------

@router.get("/list")
def list_documents(
    db: Session = Depends(get_db)
):

    documents = get_all_documents(db)

    return documents


# -------------------------
# Extract Sample PDF
# -------------------------

@router.get("/extract")
def extract_text():

    text = extract_pdf_text(
        "uploads/sample_legal_contract.pdf"
    )

    return {
        "text": text
    }


# -------------------------
# Chunk Sample PDF
# -------------------------

@router.get("/chunks")
def get_chunks():

    text = extract_pdf_text(
        "uploads/sample_legal_contract.pdf"
    )

    chunks = chunk_text(text)

    return {
        "total_chunks": len(chunks),
        "chunks": chunks
    }


# -------------------------
# Index ALL PDFs
# -------------------------

@router.get("/index-all")
def index_all():

    files = os.listdir("uploads")

    total = 0

    for file in files:

        if not file.endswith(".pdf"):
            continue

        file_path = f"uploads/{file}"

        text = extract_pdf_text(
            file_path
        )

        chunks = chunk_text(
            text
        )

        embeddings = generate_embeddings(
            chunks
        )

        add_chunks(
            chunks,
            embeddings,
            file
        )

        total += 1

    return {
        "message": "All documents indexed successfully",
        "documents": total
    }


# -------------------------
# Semantic Search
# -------------------------

@router.get("/search")
def search(query: str):

    query_embedding = generate_embeddings(
        [query]
    )[0]

    results = search_chunks(
        query_embedding
    )

    return results


# -------------------------
# Debug Search
# -------------------------

@router.get("/debug-search")
def debug_search(query: str):

    query_embedding = generate_embeddings(
        [query]
    )[0]

    results = search_chunks(
        query_embedding
    )

    return results


# -------------------------
# Ask Questions
# -------------------------

@router.get("/ask")
def ask(question: str):

    try:

        query_embedding = generate_embeddings(
            [question]
        )[0]

        results = search_chunks(
            query_embedding
        )

        if not results["documents"]:
            return {
                "answer": "No relevant documents found."
            }

        top_chunks = results["documents"][0][:5]

        context = "\n\n".join(top_chunks)

        answer = generate_answer(
            question,
            context
        )

        source = "Unknown"

        if results.get("metadatas"):
            source = results["metadatas"][0][0].get(
            "source",
            "Unknown"
            )


        return {
            "question": question,
            "answer": answer,
            "source": source
        }

    except Exception as e:

        print("ASK ERROR:", e)

        return {
            "question": question,
            "answer": "An error occurred while processing your request.",
            "source": None
        }


@router.delete("/{doc_id}")
def delete_document(
    doc_id: int,
    db: Session = Depends(get_db)
):

    document = db.query(Document).filter(
        Document.id == doc_id
    ).first()

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    # Delete physical file
    if os.path.exists(document.filepath):
        os.remove(document.filepath)

    db.delete(document)
    db.commit()

    return {
        "message": "Document deleted successfully"
    }