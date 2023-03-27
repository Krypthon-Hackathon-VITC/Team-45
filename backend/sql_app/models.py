from sqlalchemy import Boolean, String, Integer, Column, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base

class User(Base):
    __tablename__ = "New User"

    id = Column(Integer, primary_key = True, index = True)
    username = Column(String, unique=True, index = True)
    email = Column(String, unique=True, index = True, nullable = False)
    password = Column(String, nullable = False)

# class Details_adhaar(Base):
#     __tablename__ = "Extracted Details For Adhaar Card"

#     id = Column(Integer, primary_key = True, index = True)
#     name = Column(String, index = True)
#     date_of_birth = Column(String, index = True)
#     gender = Column(String, index = True)
#     adhaar_number = Column(String, unique = True, index = True)

# class Details_pan(Base):
#     __tablename__ = "Extracted Details For Pan Card"

#     id = Column(Integer, primary_key = True, index = True)
#     name = Column(String, index = True)
#     father_name = Column(String, index = True)
#     date_of_birth = Column(String, index = True)
#     pan_number = Column(String, unique = True, index = True)
