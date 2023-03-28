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


def extract_aadhaar_info(extraction):
    
    # Define the sample string
    # string = "Government of IndiaThakor Alpeshbhai/DOB10/12/1997yt/Male5692 7255 2643"

    # Define the regex pattern to extract the name, date of birth, gender, and the last sequence of numbers
    pattern = r"(?<=India)(\w+\s\w+)/DOB(\d{2}/\d{2}/\d{4})\w+/(\w+)(\d+ \d+ \d+)"

    # Use the search() method to extract the matched pattern from the string
    match = re.search(pattern, extraction)

    # Extract the matched groups
    name = match.group(1)
    dob = match.group(2)
    gender = match.group(3)
    numbers = match.group(4)
    
    return {
        "Name": name,
        "Date of birth": dob,
        "Gender": gender,
        "Numbers": numbers
    }