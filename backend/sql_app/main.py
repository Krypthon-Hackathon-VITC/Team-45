from fastapi import Depends, FastAPI, HTTPException
from pydantic import ValidationError
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from . import crud, models, schema
from . database import SessionLocal, engine

# from passlib.context import CryptContext

models.Base.metadata.create_all(bind = engine)

app = FastAPI()
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model = schema.User)
def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    if user.username is None:
        raise ValidationError("Username cannot be None.")
    db_user_username = crud.get_user_by_username(db, user.username)
    db_user_email = crud.get_user_by_email(db, user.email)
    if db_user_username:
        raise HTTPException(status_code=400, detail="Username Already taken!")
    if db_user_email:
        raise HTTPException(status_code=400, detail="Email Already Existing!")
    return crud.create_user(db=db, user=user)