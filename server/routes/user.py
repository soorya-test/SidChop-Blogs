from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from ..controllers import login, logout, sign_up
from ..schema import UserSignUpPayload, UserLoginPayload
from ..database import get_db

user_route = APIRouter(prefix="/users")


@user_route.post("/sign-up")
def sign_up_route(response: Response,
                  user: UserSignUpPayload,
                  db: Session = Depends(get_db)):
    return sign_up(response, db, user)


@user_route.post("/login")
def login_route(response: Response,
                user: UserLoginPayload,
                db: Session = Depends(get_db)):
    return login(response, db, user)


@user_route.get("/logout")
def logout_route(response: Response):
    return logout(response)
