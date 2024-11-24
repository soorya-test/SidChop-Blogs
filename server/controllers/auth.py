from sqlalchemy.orm import Session
from fastapi import HTTPException, Response, status

from ..helpers import verify_password, create_jwt, get_password_hash, validate_jwt
from ..model import UserModel
from ..schema import UserSignUpPayload, UserLoginPayload


def login(db: Session, user: UserLoginPayload):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if user is None or not verify_password(
            user.password, db_user.hashed_password):  # type: ignore
        raise HTTPException(status.HTTP_401_UNAUTHORIZED,
                            "Invalid Credentials")

    jwt = create_jwt({"sub": db_user.id})  # type: ignore

    return {"access_token": jwt}


def sign_up(db: Session, user: UserSignUpPayload):
    hashed_password = get_password_hash(user.password)
    user_dict = user.model_dump()
    new_user = UserModel(full_name=user_dict["full_name"],
                         email=user_dict["email"],
                         hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    jwt = create_jwt({"sub": new_user.id})

    return {"access_token": jwt}


def is_user_authenticated(jwt: str):
    user_id = validate_jwt(jwt)
    if user_id is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "User not Logged in")
    return user_id
