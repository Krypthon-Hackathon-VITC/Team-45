from sqlalchemy.orm import Session
from passlib.context import CryptContext

from .import models, schema

pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")

def get_user_by_username(db: Session, user_name: str):
    return db.query(models.User).filter(models.User.username == user_name).first()

def get_user_by_email(db: Session, user_email: str):
    return db.query(models.User).filter(models.User.email == user_email).first()

def create_user(db: Session, user: schema.UserCreate):
    db_user = models.User(email = user.email, username = user.username, password = pwd_context.hash(user.password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def check_user(db:Session, user: schema.UserFetch):
    if (db.query(models.User).filter(models.User.username == user.username) and db.query(models.User).filter(models.User.password == pwd_context.hash(user.password))):
        return True
    else:
        return False