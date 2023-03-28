import torch
import cv2
import numpy as np
from matplotlib import pyplot as plt
from paddleocr import PaddleOCR,draw_ocr
from PIL import Image
import re


def get_cropped_image(image, bounding_box):
    x1 = np.int32(bounding_box[0])
    y1 = np.int32(bounding_box[1])
    x2 = np.int32(bounding_box[2])
    y2 = np.int32(bounding_box[3])
    
    cropped_image = image[y1:y2, x1:x2]
    cropped_image = cv2.cvtColor(cropped_image, cv2.COLOR_BGR2RGB)
    return cropped_image


def extract_details_from_aadhar(text):
    text_list = text.split(" ")
    try:
        text_list.pop(text_list.index("Government"))
        text_list.pop(text_list.index("of"))
        text_list.pop(text_list.index("India"))
        text_list.pop(text_list.index("Issue"))
        text_list.pop(text_list.index("Download"))
        text_list.pop(text_list.index("Date"))
        text_list.pop(text_list.index("Name"))
    except Exception as e:
        print(e)
    text = " ".join(text_list)
    
    # name
    match = re.search(r'\b[A-Z][a-z]+\s+[A-Z][a-z]+\s+[A-Z][a-z]+\b', text)
    if match:
        name = match.group()
        # print(name)  # Output: Harsh Kumar Jain
    else:
        match = re.search(r'\b[A-Z][a-z]+\s[A-Z][a-z]+\b', text)
        if match:
            name = match.group()
            # print(name)
        else:
            name = "No name detected"

    # extract date of birth
    date = "No date"
    text_list_for_date = text.split(" ")
    for i in text_list:
        if 'DOB' in i:
            date = i
    


    # extract gender

    if 'Male' in text:
        gender = 'Male'
    else:
        gender = 'Female'

    # extract Aadhar number
    aadhar_pattern = r"\d{4} \d{4} \d{4}"
    aadhar_match = re.search(aadhar_pattern, text)
    if aadhar_match:
        aadhar_number = aadhar_match.group(0)
    else:
        aadhar_pattern = r"\d{12}"
        aadhar_match = re.search(aadhar_pattern, text)
        if aadhar_match:
            aadhar_number = aadhar_match.group(0)
        else:
            aadhar_number = "No data extracted"

    print("Name:", name)
    print("Date of Birth:", date)
    print("Gender:", gender)
    print("Aadhar Number:", aadhar_number)
    
    return {
        "name" : name,
        "dob" : date,
        "gender" : gender,
        "aadhaar_number" : aadhar_number
    }
