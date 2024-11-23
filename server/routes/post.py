from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..controllers import update_post, get_posts, create_post, delete_post, get_post
from ..schema import PostSchema, PostCreatePayload, PostUpdatePayload
from ..database import get_db

post_route = APIRouter(prefix="/posts")


@post_route.get("/", response_model=List[PostSchema])
def get_posts_route(skip: int = 0,
                    limit: int = 10,
                    db: Session = Depends(get_db)):
    return get_posts(db, skip=skip, limit=limit)


@post_route.post("/", response_model=PostSchema)
def create_post_route(post: PostCreatePayload, db: Session = Depends(get_db)):
    return create_post(db, post=post,
                       author_id=1)  # Replace with authenticated user ID


@post_route.get("/{post_id}", response_model=PostSchema)
def get_post_route(post_id: int, db: Session = Depends(get_db)):
    return get_post(db, post_id)


@post_route.patch("/{post_id}", response_model=PostSchema)
def update_post_route(post_id: int,
                      post: PostUpdatePayload,
                      db: Session = Depends(get_db)):
    return update_post(db, post_id=post_id, post=post)


@post_route.delete("/{post_id}")
def delete_post_route(post_id: int, db: Session = Depends(get_db)):
    delete_post(db, post_id=post_id)
    return {"message": "Post deleted"}
