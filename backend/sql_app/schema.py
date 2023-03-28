from pydantic import BaseModel, Field
from typing import Optional

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    username: str
    password: str

class UserFetch(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

# class ImgCreate(BaseModel):
#     name: str

# class ImgData(ImgCreate):
#     data: Optional[bytes] = Field(..., description="Binary Data of Image File")

# class Img(ImgCreate):
#     id: int
#     # name: str
#     # owner_username: str

#     class Config:
#         orm_mode = True
