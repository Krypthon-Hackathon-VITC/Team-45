from fastapi import Depends, FastAPI, File, HTTPException, UploadFile, Response
from pydantic import UUID4, ValidationError
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import List


from . import crud, models, schema
from . database import SessionLocal, engine
from fastapi.openapi.models import Response
import shutil
import io
import numpy as np
import cv2
import torch
from matplotlib import pyplot as plt
from paddleocr import PaddleOCR,draw_ocr
from . utils import get_cropped_image, extract_details_from_aadhar

from passlib.context import CryptContext

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

model = torch.hub.load('ultralytics/yolov5', 'custom', path = './sql_app/150-epochs-best.pt', force_reload = True)
ocr = PaddleOCR(use_angle_cls=True, lang='en') # need to run only once to download and load model into memory
names = ['aadhar card', 'driving license', 'pan card', 'salary slip', 'voter id']


def give_detection_results(image):
    image = cv2.resize(image, (640, 640))
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = model(image)
    print(results)
    # return results
    print(results)
    bbox = results.xyxy[0][0]
    cropped_image = get_cropped_image(image, bbox)
    detected_class = int(results.xyxy[0][0][-1])
    detected_class = names[detected_class]
    cropped_image = cv2.cvtColor(cropped_image, cv2.COLOR_BGR2RGB)
    result = ocr.ocr(cropped_image, cls=True)
    extraction = ""
    for idx in range(len(result)):
        res = result[idx]
        for line in res:
            extraction += line[-1][0]
            extraction += ' '
    print(extraction)

    info = extract_details_from_aadhar(extraction)

    return info



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

@app.post("/check_user/")
def login_user(user: schema.UserFetch, db: Session = Depends(get_db)):
    if crud.check_user(db, user):
        return {"success": True}
    else:
        raise HTTPException(status_code=404, detail="User not found")
    
@app.post("/upload_img/")
def add_image(file: UploadFile = File(...)):
    with open(f'{file.filename}', 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)
        print(buffer)
        
        img = cv2.imread(buffer.name)
        # print(img)
        info = give_detection_results(img)
        print(info)


    return {"Details": info}


@app.post("/img/")
def upload_img(files: list[UploadFile] ):

    file_and_data = {}
    for file in files:
        with open(f'{file.filename}', "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            print(buffer)
        
            img = cv2.imread(buffer.name)
            # print(img)
            info = give_detection_results(img)

            file_and_data[f'{buffer.name}'] = info
            

    return {"filename": file_and_data}


