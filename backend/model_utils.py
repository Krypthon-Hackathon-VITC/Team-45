import numpy as np
import cv2
import re


def allowed_file(filename):
    """
        checks if a file is of the following type
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}


def get_cropped_image(image, bounding_box):
    """
        fetches the cropped part of image where a particular
        document is predicted to be according to the bounding
        box coordinates
    """
    x1 = np.int32(bounding_box[0])
    y1 = np.int32(bounding_box[1])
    x2 = np.int32(bounding_box[2])
    y2 = np.int32(bounding_box[3])
    
    cropped_image = image[y1:y2, x1:x2]
    cropped_image = cv2.cvtColor(cropped_image, cv2.COLOR_BGR2RGB)
    return cropped_image


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


def extract_details_from_aadhar(text):
    """
        extracts aadhaar details from the text which is
        extracted from image using paddle OCR
    """
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
        "predicted_class" : "aadhaar card",
        "name" : name,
        "dob" : date,
        "gender" : gender,
        "aadhaar_number" : aadhar_number
    }


def extract_details_from_pan_except_name(text):
    """
        extracts pan details from the text which is
        extracted from image using paddle OCR
    """
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
    date = "Not detected"
    matches = re.findall(date_regex, text)
    if matches:
        date = matches[0]
        print(date)
    else:
        print("No date found.")


    # # # pan number extraction
    pan_number = "Not detected"
    pan_number_regex = r"\b([A-Z0-9]{10})\b"

    matches = re.findall(pan_number_regex, text)
    print(matches)

    for match in matches:
        
        if match.isalpha() == False and match.isalnum() == True:
            pan_number = match

    print("Date of Birth:", date)
    print("Permanent Account Number:", pan_number)

    return {
        "predicted_class" : "pan card",
        "name" : "Not detected",
        "dob" : date,
        "father_name" : "Not detected",
        "pan_number" : pan_number
    }


def extract_name_from_pancard_preprocessing(cropped_image):
    cropped_image = preprocess_image(cropped_image)
    print(cropped_image.shape)

    # get cropped name part
    height = cropped_image.shape[0]
    width = cropped_image.shape[1]

    name_part_of_image = cropped_image[int(height*0.50) : int(height*0.80), 0:int(width/2)]

    return name_part_of_image

def extract_name_part_from_pancard(cropped_image):
    cropped_image = preprocess_image(cropped_image)
    print(cropped_image.shape)

    # get cropped name part
    height = cropped_image.shape[0]
    width = cropped_image.shape[1]

    name_part_of_image = cropped_image[int(height*0.50) : int(height*0.80), 0:int(width*0.70)]

    return name_part_of_image
    # cv2.imshow("name part", name_part_of_image)
    # cv2.imshow("cropped_image", cropped_image)




    # name_cropped_image = extract_name_from_pancard_preprocessing(cropped_image)



    # result = ocr.ocr(name_part_of_image, cls=True)
    # name_list_ocr_extracted = []
    # for idx in range(len(result)):
    #     res = result[idx]
    #     for line in res:
    #         name_list_ocr_extracted.append(line[-1][0])

    # print(name_list_ocr_extracted)
    # name = name_list_ocr_extracted[1]
    # father_name = name_list_ocr_extracted[-1]
    # print("name from pancard", extraction)


    # return name, father_name