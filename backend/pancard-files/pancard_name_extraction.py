import numpy as np
from PIL import Image
import cv2
import torch
from matplotlib import pyplot as plt
from paddleocr import PaddleOCR
from model_utils import get_cropped_image


def extract_name_from_pancard_preprocessing(cropped_image):
    cropped_image = preprocess_image(cropped_image)
    print(cropped_image.shape)

    # get cropped name part
    height = cropped_image.shape[0]
    width = cropped_image.shape[1]

    name_part_of_image = cropped_image[int(height*0.50) : int(height*0.80), 0:int(width/2)]

    return name_part_of_image

def preprocess_image(img):
    gray = cv2.cvtColor(np.array(img),cv2.COLOR_BGR2GRAY)
    resized = cv2.resize(gray,None, fx = 1.5,fy = 1.5,interpolation = cv2.INTER_LINEAR)
    
    
    
    processed_image = cv2.adaptiveThreshold(
        resized,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        21,
        5
    )

    # kernel = np.ones((3, 3), np.uint8)
    # processed_image = cv2.erode(processed_image, kernel, iterations=1)
    # processed_image = cv2.dilate(processed_image, kernel, iterations=1)

    return processed_image
    

model = torch.hub.load('ultralytics/yolov5', 'custom', path = 'model-weights/150-epochs-best.pt', force_reload = True)
ocr = PaddleOCR(use_angle_cls=True, lang='en') # need to run only once to download and load model into memory
names = ['aadhar card', 'driving license', 'pan card', 'salary slip', 'voter id']


image = cv2.imread("testing-images/baa5ab4b-952b-43fd-b91e-19664c6c5e6a.jpeg")
image = cv2.resize(image, (640, 640))
cv2.imshow("image bgr", image)
cv2.waitKey(0)
# image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
cv2.imshow("image rgb", image)
results = model(image)
print(results)

bbox = results.xyxy[0][0]
print(np.int32(bbox))
cropped_image = get_cropped_image(image, bbox)

print(cropped_image.shape)


# cv2.imshow("cropped_image", cropped_image)


cropped_image = preprocess_image(cropped_image)
print(cropped_image.shape)

# get cropped name part
height = cropped_image.shape[0]
width = cropped_image.shape[1]

name_part_of_image = cropped_image[int(height*0.50) : int(height*0.80), 0:int(width*0.70)]
cv2.imshow("name part", name_part_of_image)
cv2.imshow("cropped_image", cropped_image)




# name_cropped_image = extract_name_from_pancard_preprocessing(cropped_image)



result = ocr.ocr(name_part_of_image, cls=True)
extraction = ""
name_list_ocr_extracted = []
for idx in range(len(result)):
    res = result[idx]
    for line in res:
        name_list_ocr_extracted.append(line[-1][0])
        extraction += line[-1][0]
        extraction += ' '

print(name_list_ocr_extracted)
name = name_list_ocr_extracted[1]
father_name = name_list_ocr_extracted[-1]
print("name from pancard", extraction)


cv2.waitKey(0)