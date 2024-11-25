import os
from fastapi import HTTPException
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains.summarize import load_summarize_chain
from langchain.docstore.document import Document
from langchain.prompts import PromptTemplate
from pydantic import SecretStr

from ..schema import BlogSchema

GEMINI_API_KEY = SecretStr(os.getenv("GEMINI_API_KEY") or "")

gemini = ChatGoogleGenerativeAI(model="gemini-pro",
                                api_key=GEMINI_API_KEY,
                                temperature=0.7,
                                top_p=0.8,
                                top_k=40)

prompt_template = """
Please provide a comprehensive summary of the following blog post. The summary should:
- Be between {min_length} and {max_length} characters
- Maintain the key points and main ideas
- Keep the original tone and style
- Be well-structured and coherent
- Include the most important details and examples

Blog Content:
{text}
Summary:
"""


def prepare_documents(content: str):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=200,
        length_function=len,
        separators=["\n\n", "\n", ".", "!", "?", ",", " ", ""])
    texts = text_splitter.split_text(content)
    return [Document(page_content=t) for t in texts]


def get_summary(blog: BlogSchema):
    try:
        if not GEMINI_API_KEY.get_secret_value():
            raise HTTPException(
                status_code=500,
                detail="Google API key not found in environment variables")

        prompt = PromptTemplate(
            template=prompt_template,
            input_variables=["text", "max_length", "min_length"])

        docs = prepare_documents(blog.content)

        chain = load_summarize_chain(
            llm=gemini,
            chain_type="stuff",
            prompt=prompt,
        )

        # Run summarization
        summary: str = chain.run(input_documents=docs,
                                 max_length=blog.max_length,
                                 min_length=blog.min_length)

        return {"summary": summary}

    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Summarization failed: {str(e)}")
