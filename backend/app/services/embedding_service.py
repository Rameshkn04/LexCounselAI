# backend/app/services/embedding_service.py

import numpy as np

def generate_embeddings(chunks):
    """
    Lightweight dummy embeddings for Render free tier.
    Avoids loading SentenceTransformer/Torch.
    """

    embeddings = np.zeros((len(chunks), 384))

    return embeddings