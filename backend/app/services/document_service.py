# app/services/document_service.py

from sqlalchemy.orm import Session
from app.models.document import Document


def create_document(
    db: Session,
    filename: str,
    filepath: str,
    user_id: int = None
):
    document = Document(
        filename=filename,
        filepath=filepath,
        user_id=user_id
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


def get_all_documents(db: Session):
    return db.query(Document).all()