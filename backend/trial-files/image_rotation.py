import cv2
import numpy as np

def correct_image_orientation(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150, apertureSize=3)
    lines = cv2.HoughLines(edges, 1, np.pi / 180, threshold=100)

    angles = []
    if lines is not None:
        for line in lines:
            rho, theta = line[0]
            angle = theta * 180 / np.pi
            angles.append(angle)

    angle_mean = np.mean(angles)
    rotation_angle = angle_mean
    print(image_path, rotation_angle)

    # Rotate the image to the correct angle
    rotated_image = image.copy()
    if abs(rotation_angle) > 1.0:
        num_rotations = int(round(rotation_angle / 90.0)) % 4
        rotated_image = np.rot90(image, num_rotations)

    return rotated_image


def is_image_rotated(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150, apertureSize=3)
    lines = cv2.HoughLines(edges, 1, np.pi / 180, threshold=100)

    angles = []
    if lines is not None:
        for line in lines:
            rho, theta = line[0]
            angle = theta * 180 / np.pi
            angles.append(angle)

    angle_mean = np.mean(angles)
    is_rotated = abs(angle_mean) > 1.0
    print(abs(angle_mean))

    return is_rotated

# im1 = cv2.imread()
# im2 = cv2.imread()

cv2.imshow("rotated", correct_image_orientation("testing-images/rotated.jpeg"))

cv2.waitKey(0)