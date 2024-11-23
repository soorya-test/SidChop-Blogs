from datetime import datetime, timedelta
from jose import jwt
import os

SECRET_KEY = os.getenv("JWT_SECRET_KEY") or ""
TOKEN_EXPIRY = 60 * 60 * 24 * 30  # 30 days
ALGORITHM = "HS256"


def create_jwt(data: dict) -> str:
    jwt_data = data.copy()
    jwt_expiry = (datetime.now() + timedelta(seconds=TOKEN_EXPIRY))
    jwt_data.update({"exp": jwt_expiry})
    encoded_jwt = jwt.encode(jwt_data, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def validate_jwt(token: str) -> str | None:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get('sub')
        return username
    except:
        return None
