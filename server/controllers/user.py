from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from ..model import UserModel


def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(UserModel).offset(skip).limit(limit).all()


def get_user(db: Session, user_id: int):
    user = db.query(UserModel).filter(
        UserModel.id == user_id).first()  # type: ignore
    if user is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Post not Found")
    return user


def delete_user(db: Session, user_id: int):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if db_user is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Post not Found")
    db.delete(db_user)
    db.commit()

    return db_user
