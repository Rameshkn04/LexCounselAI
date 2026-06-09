import google.generativeai as genai

from app.core.config import GEMINI_API_KEY

print("GEMINI_API_KEY EXISTS:", bool(GEMINI_API_KEY))

# Configure Gemini
genai.configure(
    api_key=GEMINI_API_KEY
)

# Stable model
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
        print("CALLING GEMINI...")

        response = model.generate_content(
            prompt
        )
        print("GEMINI RESPONSE RECEIVED")

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

        print("========== GEMINI ERROR ==========")
        print(str(e))
        print("==================================")

        fallback_context = context[:1000]

        return (
            "AI service temporarily unavailable.\n\n"
            f"Retrieved Context:\n{fallback_context}"
        )