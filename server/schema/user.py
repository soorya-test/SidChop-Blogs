from pydantic import BaseModel


class UserSchema(BaseModel):
    id: int
    full_name: str
    email: str

    class Config:
        from_attributes = True


class UserSignUpPayload(BaseModel):
    full_name: str
    email: str
    password: str


class UserLoginPayload(BaseModel):
    email: str
    password: str
