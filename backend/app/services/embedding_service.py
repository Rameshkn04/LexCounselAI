from sklearn.feature_extraction.text import HashingVectorizer

vectorizer = HashingVectorizer(
    n_features=384,
    alternate_sign=False
)


def generate_embeddings(texts):
    """
    Lightweight embeddings for Render free tier.
    No Torch, no SentenceTransformer.
    """

    vectors = vectorizer.transform(texts)

    return vectors.toarray()