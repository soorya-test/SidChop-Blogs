from pydantic import BaseModel
from typing import Optional


class BlogSchema(BaseModel):
    content: str
    min_length: Optional[int] = 100
    max_length: Optional[int] = 500
