from sentence_transformers import SentenceTransformer

# Load model once when app starts
model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def generate_embeddings(texts):
    """
    Generate embeddings for a list of texts.
    Returns NumPy array compatible with ChromaDB.
    """

    return model.encode(
        texts,
        convert_to_numpy=True
    )