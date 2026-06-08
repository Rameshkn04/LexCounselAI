# backend/app/services/embedding_service.py

def generate_embeddings(chunks):
    """
    Temporary lightweight embedding service for Render deployment.
    Returns dummy vectors to avoid loading SentenceTransformer,
    Torch, and Transformers models.
    """

    embeddings = []

    for _ in chunks:
        embeddings.append([0.0] * 384)

    return embeddings