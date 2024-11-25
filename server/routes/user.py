from fastapi import APIRouter, Depends, HTTPException, Header, status
from sqlalchemy.orm import Session
from typing import Annotated, List

from ..schema.user import UserSchema
from ..controllers import get_users, delete_user, get_user, get_user_from_header
from ..schema import UserSchema
from ..database import get_db

user_route = APIRouter(prefix="/users")


@user_route.get("/", response_model=List[UserSchema])
def get_users_route(skip: int = 0,
                    limit: int = 10,
                    db: Session = Depends(get_db)):
    return get_users(db, skip=skip, limit=limit)


@user_route.get("/{user_id}", response_model=UserSchema)
def get_user_route(user_id: int, db: Session = Depends(get_db)):
    return get_user(db, user_id)


@user_route.delete("/{user_id}", response_model=UserSchema)
def delete_user_route(user_id: int, db: Session = Depends(get_db)):
    return delete_user(db, user_id)


@user_route.get("/token/{authorization}", response_model=UserSchema)
def get_user_from_header_route(authorization: str,
                               db: Session = Depends(get_db)):
    print(authorization)
    if authorization is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Unauthorized")

    return get_user_from_header(db, authorization)
