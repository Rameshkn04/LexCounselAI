import requests


def generate_answer(
    question: str,
    context: str
):

    prompt = f"""
You are LexCounsel AI, an intelligent legal document assistant.

Your task is to answer questions ONLY using the provided document context.

Rules:
1. Use only information present in the context.
2. If the exact answer is not available but related information exists, provide the closest relevant answer.
3. If no relevant information exists, reply exactly:
   "I could not find this information in the uploaded document."
4. Use professional and concise language.
5. Do not invent facts.

Document Context:
{context}

Question:
{question}

Answer:
"""

    try:

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3",
                "prompt": prompt,
                "stream": False
            },
            timeout=120
        )

        response.raise_for_status()

        result = response.json()

        return result.get(
            "response",
            "I could not generate an answer."
        )

    except Exception as e:

        print(
            "Ollama Error:",
            str(e)
        )

        return (
            "AI service temporarily unavailable."
        )