from sentence_transformers import SentenceTransformer

_model = None

def get_model():
    global _model

    if _model is None:
        _model = SentenceTransformer(
            "all-MiniLM-L6-v2",
            local_files_only=True
        )

    return _model


def generate_embeddings(chunks):

    model = get_model()

    embeddings = model.encode(
        chunks,
        convert_to_tensor=False
    )

    return embeddings