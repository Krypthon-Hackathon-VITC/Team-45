from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
import io

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

def check_user(db: Session, user: schema.UserFetch):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user and pwd_context.verify(user.password, db_user.password):
        return True
    else:
        return False
    

# def create_image(db: Session, image: schema.ImgData):
#     with io.BytesIO(image.data) as f:
#         image_data = f.read()
#     db_image = models.Image(name=image.name, data=image_data)
#     db.add(db_image)
#     db.commit()
#     db.refresh(db_image)
#     return db_image