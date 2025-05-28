import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
  api_key=os.getenv("OPENAI_API_KEY")
)

async def ask_llm(question: str) -> str:
    chat = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a travel expert. Answer the question in a well formatted and easy to read way."},
            {"role": "user", "content": question}
        ]
    )
    return chat.choices[0].message.content.strip()

