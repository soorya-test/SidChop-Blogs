from fastapi import APIRouter
from .auth import auth_route
from .user import user_route
from .post import post_route

api_route = APIRouter(prefix="/api")


@api_route.get("/health")
async def read_root():
    return {"status": True}


api_route.include_router(post_route)
api_route.include_router(auth_route)
api_route.include_router(user_route)
