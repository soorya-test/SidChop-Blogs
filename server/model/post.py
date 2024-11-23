from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime

from ..database import Base


class PostModel(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    author_id = Column(Integer)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    author_id = Column(Integer, ForeignKey("users.id"))
