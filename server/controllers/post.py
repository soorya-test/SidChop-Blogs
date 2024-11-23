from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..model import Post
from ..schema import PostUpdatePayload, PostCreatePayload


def get_posts(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Post).offset(skip).limit(limit).all()


def get_post(db: Session, post_id: int):
    post = db.query(Post).filter(Post.id == post_id).first()  # type: ignore
    if post is None:
        raise HTTPException(404, "Post not Found")
    return post


def create_post(db: Session, post: PostCreatePayload, author_id: int):
    db_post = Post(**post.model_dump(), author_id=author_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def update_post(db: Session, post_id: int, post: PostUpdatePayload):
    db_post = db.query(Post).filter(Post.id == post_id).first()  # type: ignore
    if db_post is None:
        raise HTTPException(404, "Post not Found")
    for key, value in post.model_dump().items():
        if value:
            setattr(db_post, key, value)
    db.commit()
    db.refresh(db_post)
    return db_post


def delete_post(db: Session, post_id: int):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post:
        db.delete(db_post)
        db.commit()
