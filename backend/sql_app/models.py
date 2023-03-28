from sqlalchemy import Boolean, String, Integer, Column, ForeignKey, LargeBinary
from sqlalchemy.orm import relationship

from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, index = True)
    username = Column(String, primary_key = True, unique=True, index = True)
    email = Column(String, unique=True, index = True, nullable = False)
    password = Column(String, nullable = False)

    # images = relationship("AddImg", back_populates = "owner")

# class AddImg(Base):
#     __tablename__ = "images"

#     id = Column(Integer, primary_key = True, index = True)
#     name = Column(String(100), nullable = False)
#     data = Column(LargeBinary)
    # owner_username = Column(String, ForeignKey('users.username'))

    # owner = relationship("User", back_populates = "AddImg")
    

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
