from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from .routes import post_route, auth_route, user_route
from .database import init_db

init_db()

app = FastAPI()

api_route = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@api_route.get("/")
async def read_root():
    return {"status": True}


api_route.include_router(post_route)
api_route.include_router(auth_route)
api_route.include_router(user_route)

app.include_router(api_route)
