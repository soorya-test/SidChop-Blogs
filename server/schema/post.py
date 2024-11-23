from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class PostSchema(BaseModel):
    id: int
    title: str
    content: str
    author_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PostCreatePayload(BaseModel):
    title: str
    content: str


class PostUpdatePayload(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
