from pydantic import BaseModel

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