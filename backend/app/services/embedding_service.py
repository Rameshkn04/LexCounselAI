# backend/app/services/embedding_service.py

import google.generativeai as genai

from app.core.config import GEMINI_API_KEY

# Configure Gemini
genai.configure(
    api_key=GEMINI_API_KEY
)

def generate_embeddings(texts):
    """
    Generate embeddings using Gemini Embedding Model.
    Works on Render free tier without Torch.
    """

    embeddings = []

    for text in texts:

        try:

            response = genai.embed_content(
                model="models/text-embedding-004",
                content=text
            )

            embeddings.append(
                response["embedding"]
            )

        except Exception as e:

            print(
                f"Embedding Error: {e}"
            )

            # fallback vector
            embeddings.append(
                [0.0] * 768
            )

    return embeddings