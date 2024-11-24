from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from .auth import is_user_authenticated
from ..model import PostModel
from ..schema import PostUpdatePayload, PostCreatePayload


def get_posts(db: Session, skip: int = 0, limit: int = 10):
    return db.query(PostModel).offset(skip).limit(limit).all()


def get_post(db: Session, post_id: int):
    post = db.query(PostModel).filter(
        PostModel.id == post_id).first()  # type: ignore
    if post is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Post not Found")
    return post


def create_post(db: Session, post: PostCreatePayload, jwt: str):
    user_id = is_user_authenticated(jwt)
    db_post = PostModel(**post.model_dump(), author_id=int(user_id))
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def update_post(db: Session, post_id: int, post: PostUpdatePayload, jwt: str):
    user_id = is_user_authenticated(jwt)
    db_post = db.query(PostModel).filter(PostModel.id == post_id).first()
    if db_post is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Post not Found")
    if db_post.author_id == int(user_id):  # type: ignore
        raise HTTPException(status.HTTP_403_FORBIDDEN, "No Permissions")
    for key, value in post.model_dump().items():
        if value:
            setattr(db_post, key, value)
    db.commit()
    db.refresh(db_post)
    return db_post


def delete_post(db: Session, post_id: int, jwt: str):
    user_id = is_user_authenticated(jwt)
    db_post = db.query(PostModel).filter(PostModel.id == post_id).first()
    if db_post is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Post not Found")
    if db_post.author_id == int(user_id):  # type: ignore
        raise HTTPException(status.HTTP_403_FORBIDDEN, "No Permissions")
    db.delete(db_post)
    db.commit()
