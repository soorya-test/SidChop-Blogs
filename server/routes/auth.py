from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from ..controllers import login, sign_up
from ..schema import UserSignUpPayload, UserLoginPayload
from ..database import get_db

auth_route = APIRouter(prefix="/auth")


@auth_route.post("/sign-up")
def sign_up_route(user: UserSignUpPayload, db: Session = Depends(get_db)):
    return sign_up(db, user)


@auth_route.post("/login")
def login_route(user: UserLoginPayload, db: Session = Depends(get_db)):
    return login(db, user)
