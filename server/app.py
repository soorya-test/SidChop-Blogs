from typing import Union

from fastapi import FastAPI, APIRouter

app = FastAPI()

api_route = APIRouter(prefix="/api")


@api_route.get("/")
async def read_root():
    return {"status": True}


app.include_router(api_route)
