import google.generativeai as genai

from app.core.config import GEMINI_API_KEY

# Configure Gemini
genai.configure(
    api_key=GEMINI_API_KEY
)

# Recommended model
model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def generate_answer(
    question: str,
    context: str
):
    """
    Generate answer using retrieved document context.
    """

    prompt = f"""
You are LexCounsel AI, a legal document assistant.

Rules:
1. Answer ONLY from the provided context.
2. Do NOT make up information.
3. If the answer is not present in the context, reply:
   "I could not find this information in the uploaded document."
4. Keep answers concise and professional.
5. Mention only information supported by the context.

CONTEXT:
{context}

QUESTION:
{question}

ANSWER:
"""

    try:

        response = model.generate_content(
            prompt
        )

        if (
            response
            and hasattr(response, "text")
            and response.text
        ):
            return response.text.strip()

        return (
            "I could not generate a response "
            "from the provided document."
        )

    except Exception as e:

        print(f"Gemini Error: {e}")

        # Fallback answer from retrieved context
        fallback_context = context[:1000]

        return (
            "AI service temporarily unavailable.\n\n"
            f"Retrieved Context:\n{fallback_context}"
        )