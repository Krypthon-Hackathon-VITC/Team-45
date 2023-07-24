import cv2
import numpy as np


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


img = cv2.imread("testing-images/a2f1f2834472ef1c93d076de916f6ee9.jpg")
img = cv2.resize(img, (640, 640))
cv2.imshow("before preprocessing", img)
cv2.imshow("after preprocessing", preprocess_image(img))
crop_img = img[280:420, 0:320]
cv2.imshow("after cropped preprocessing", preprocess_image(crop_img))
cv2.waitKey(0)