import numpy as np
from PIL import Image
import cv2
import torch
from matplotlib import pyplot as plt
from paddleocr import PaddleOCR
from model_utils import get_cropped_image
import re


def preprocess_image(img):
    gray = cv2.cvtColor(np.array(img),cv2.COLOR_BGR2GRAY)
    resized = cv2.resize(gray,None, fx = 1.5,fy = 1.5,interpolation = cv2.INTER_LINEAR)
    
    
    
    processed_image = cv2.adaptiveThreshold(
        resized,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31,
        11
    )
    
    return processed_image

model = torch.hub.load('ultralytics/yolov5', 'custom', path = 'model-weights/150-epochs-best.pt', force_reload = True)
ocr = PaddleOCR(use_angle_cls=True, lang='en') # need to run only once to download and load model into memory
names = ['aadhar card', 'driving license', 'pan card', 'salary slip', 'voter id']


image = cv2.imread("testing-images/9b5ee2dd759ebd6ab10442c3bac0b823.jpg")
image = cv2.resize(image, (640, 640))
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
results = model(image)
print(results)

bbox = results.xyxy[0][0]
print(np.int32(bbox))
cropped_image = get_cropped_image(image, bbox)

print(cropped_image.shape)


cv2.imshow("cropped_image", cropped_image)


cropped_image = preprocess_image(cropped_image)
print(cropped_image.shape)

# get cropped name part
height = cropped_image.shape[0]
width = cropped_image.shape[1]

name_part_of_image = cropped_image[int(height*0.50) : int(height*0.80), 0:int(width/2)]
cv2.imshow("name part", name_part_of_image)
cv2.imshow("cropped_image", cropped_image)
result = ocr.ocr(cropped_image, cls=True)
extraction = ""
for idx in range(len(result)):
    res = result[idx]
    for line in res:
        extraction += line[-1][0]
        extraction += ' '
print(extraction)


text = extraction.upper()
text_list = text.split(" ")

extra_words = ["INCOME", "TAX", "DEPARTMENT", "INCOMETAX", "GOVT.OFINDIA", "Permanent", "Account", "Number", 
               "Signature", "GOVTOF", "INDIA", "GOVT.", "GOVT", "OF"]

for word_to_pop in extra_words:

    try:
        text_list.pop(text_list.index(word_to_pop.upper()))


    except Exception as e:
        print(e)


text = " ".join(text_list)
print(text)


# date
date_regex = r"\b(\d{2}/\d{2}/\d{4})\b"

matches = re.findall(date_regex, text)
if matches:
    date = matches[0]
    print(date)
else:
    print("No date found.")


# popping date from text
text_list = text.split(" ")
try:
    text_list.pop(text_list.index(date))
except Exception as e:
    print(e)
text = " ".join(text_list)


# # # pan number extraction
pan_number = "Not detected"
pan_number_regex = r"\b([A-Z0-9]{10})\b"

matches = re.findall(pan_number_regex, text)
print(matches)

for match in matches:
    
    if match.isalpha() == False and match.isalnum() == True:
        pan_number = match


# # # popping date from text
text_list = text.split(" ")
try:
    text_list.pop(text_list.index(pan_number))
except Exception as e:
    print(e)
text = " ".join(text_list)

print(text)



text = "CCBHIE PXIH. HCBR GOVTOFINDIA NECHS CARD SELHUVO LOHE /NAME FT T/FATHER'S NAME CHINEYILOHE 16012020 DATE BIRTH 3.DOHE 10/09/2001 /SIGNATURE"
# print(text.index("NAME"))

name = "Not Detected"
name_index = -1
father_index = -1
text_list = text.split(" ")
for word in text_list:
    if word.find("NAME", 0, len(word)) != -1:
        print(word)
        if name_index == -1:
            name_index = text_list.index(word)
    
    elif word.find("FATHER", 0, len(word)) != -1:
        # print(word)
        father_index = text_list.index(word)


if name_index != -1 and father_index != -1:
    name = text_list[name_index+1:father_index]

# surname = text_list[-1]
# father_name = ""
# for word in text_list[father_index + 2:]:
#     if word == surname:
#         break
#     father_name += word

# father_name += surname
# print(father_name)

print(name)



print("Name:", name)
print("Date of Birth:", date)
print("Permanent Account Number:", pan_number)

cv2.waitKey(0)