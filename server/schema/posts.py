from pydantic import BaseModel
from typing import Optional


class PostBase(BaseModel):
    title: str
    content: str


class PostCreatePayload(PostBase):
    pass


class PostUpdatePayload(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None


class PostSchema(PostBase):
    id: int
    author_id: int

    class Config:
        from_attributes = True
