from flask import Flask, request, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_bcrypt import Bcrypt, check_password_hash

from model_utils import allowed_file, extract_details_from_aadhar, get_cropped_image, extract_details_from_pan_except_name, extract_name_part_from_pancard

import numpy as np
from PIL import Image
import cv2
import torch
from matplotlib import pyplot as plt
from paddleocr import PaddleOCR
import base64
import io
from flask_cors import CORS


model = torch.hub.load('ultralytics/yolov5', 'custom', path = 'model-weights/150-epochs-best.pt', force_reload = True)
ocr = PaddleOCR(use_angle_cls=True, lang='en') # need to run only once to download and load model into memory
names = ['aadhar card', 'driving license', 'pan card', 'salary slip', 'voter id']


def give_detection_results(image):
    image = cv2.resize(image, (640, 640))
    # image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = model(image)
    print(results)

    bbox = results.xyxy[0][0]
    cropped_image = get_cropped_image(image, bbox)
    detected_class = int(results.xyxy[0][0][-1])
    detected_class = names[detected_class]
    cropped_image = cv2.cvtColor(cropped_image, cv2.COLOR_BGR2RGB)

    # if detected_class == 'pan card':
    #     name_cropped_image = extract_name_from_pancard_preprocessing(cropped_image)
    #     result = ocr.ocr(name_cropped_image, cls=True)
    #     extraction = ""
    #     for idx in range(len(result)):
    #         res = result[idx]
    #         for line in res:
    #             extraction += line[-1][0]
    #             extraction += ' '
    #     print("name from pancard", extraction)

    result = ocr.ocr(cropped_image, cls=True)
    extraction = ""
    for idx in range(len(result)):
        res = result[idx]
        for line in res:
            extraction += line[-1][0]
            extraction += ' '
        print(extraction)

    if detected_class == 'aadhar card':
        info = extract_details_from_aadhar(extraction)
    elif detected_class == 'driving license':
        # info = extract_details_from_aadhar(extraction)
        return {"predicted_class":"driving_license"}
    elif detected_class == 'pan card':
        info = extract_details_from_pan_except_name(extraction)
        name_part_of_image = extract_name_part_from_pancard(cropped_image=cropped_image)
        cv2.imshow("cccc", name_part_of_image)
        result = ocr.ocr(name_part_of_image, cls=True)
        name_list_ocr_extracted = []
        for idx in range(len(result)):
            res = result[idx]
            for line in res:
                name_list_ocr_extracted.append(line[-1][0])

        print(name_list_ocr_extracted)
        try:
            info['name'] = name_list_ocr_extracted[1]
            info['father_name'] = name_list_ocr_extracted[-1]
        except Exception as e:
            print(e)
        # info = extract_name_from_pancard(cropped_image=cropped_image, info)
    elif detected_class == 'salary slip':
        # info = extract_details_from_aadhar(extraction)
        return {"predicted_class":"salary_slip"}
    else:
        info = extract_details_from_aadhar(extraction)


    return info


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///document-extraction.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# create an instance of bcrypt
bcrypt = Bcrypt(app)

# INITIALIZE THE DATABASE
db = SQLAlchemy(app)

# create a database model
class User(db.Model):

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200), nullable = False)
    date_created = db.Column(db.DateTime, default = datetime.utcnow)
    email = db.Column(db.String, unique = True, nullable = False)
    password = db.Column(db.String, nullable = False)


class AddImage(db.Model):

    id = db.Column(db.Integer, primary_key = True)
    filename = db.Column(db.String)
    data = db.Column(db.LargeBinary)



@app.route("/signup", methods = ["POST", "GET"])
def user():

    if request.method == 'POST':

        data = request.get_json()
        user_email = data.get('email')
        user_name = data.get('username')
        user_password = data.get('password')

        # Check if the email or username is already taken
        existing_user = User.query.filter_by(email=user_email).first()
        if existing_user:
            return jsonify({"error": "Email already registered."}), 400

        existing_username = User.query.filter_by(name=user_name).first()
        if existing_username:
            return jsonify({"error": "Username already taken."}), 400

        # Ensure the password meets complexity requirements (e.g., minimum length)
        if len(user_password) < 8:
            return jsonify({"error": "Password must be at least 8 characters long."}), 400
        encrypted_password = bcrypt.generate_password_hash(user_password)

        # adding user to the database
        new_user = User(name=user_name, email = user_email, password = encrypted_password)

        # push/ commit to the database
        try:
            db.session.add(new_user)
            db.session.commit()

        except Exception as e:
            print(e)
            return {"error" : f"{e}"}
        
        return {
            "retrieved_email" : str(user_email),
            "retrieved_password" : str(encrypted_password),
            "retrieved_name" : str(user_name)
        }

    return "Login page"


@app.route("/login", methods = ['POST', 'GET'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')

    user = User.query.filter_by(email=email).first()

    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user or not check_password_hash(user.password, password):
        return {"Error": "Please check your login details and try again"}
        # return redirect(url_for('auth.login')) # if the user doesn't exist or password is wrong, reload the page

    return {"fffsf" : "Successful login"}
    


@app.route("/uploadImage", methods = ["GET", "POST"])
def uploadImage():

    if request.method == 'POST':
        file = request.files['file']

        new_file_upload = AddImage(filename = file.filename, data = file.read())
        db.session.add(new_file_upload)
        db.session.commit()
        list_of_images = AddImage.query.all()
        # print(list_of_images)
        for i in list_of_images:
            print(i.filename)
        return {"Uploaded" : f"{file.filename}"}
    

@app.route('/extract_details', methods = ['GET',"POST"])
def extract_details():

    info_of_multiple_files = {}
    
    if request.method == 'POST':
        
        if 'files[]' not in request.files:
            return {"Error" : "No file part"}
        
        files = request.files.getlist('files[]')
        print(files)


        for file in files:

            if file.filename == '':
                return {"error" : "No selected file'"}
            

            if allowed_file(file.filename):

                image = Image.open(file)
                image_array = np.array(image)

                info = give_detection_results(image_array)
                print(info)

                # temp_dict_to_append = {file.filename : info}
                # info_of_multiple_files.update(temp_dict_to_append)

                # Convert the image to Base64 format
                buffered = io.BytesIO()
                image.save(buffered, format="JPEG")  # You can use the appropriate format (JPEG, PNG, etc.)
                encoded_image = base64.b64encode(buffered.getvalue()).decode("utf-8")

                temp_dict_to_append = {file.filename: {"info": info, "image": encoded_image}}
                info_of_multiple_files.update(temp_dict_to_append)

    return info_of_multiple_files


            # new_file_upload = AddImage(filename = file.filename, data = file.read())
            # db.session.add(new_file_upload)
            # db.session.commit()
            # list_of_images = AddImage.query.all()
            # # print(list_of_images)
            # for i in list_of_images:
            #     print(i.filename)
            # return {"Uploaded" : f"{file.filename}"}



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        app.run(host='0.0.0.0', port=5000, debug=True)
