import numpy as np
import pdf2image
import cv2
import pandas as pd
from tabula import read_pdf
from pdf2image import convert_from_path
import matplotlib.pyplot as plt
import pytesseract
from concurrent.futures import ThreadPoolExecutor
import PyPDF2
import re

pdf_path = 'CEGP012620_S.E.(2019 PAT.)(INFORMATIOM TECHNOLOGY) (1).pdf'

def convert_to_image(page_number):
    pil_image = pdf2image.convert_from_path(pdf_path,dpi=300,first_page=page_number, last_page=page_number)[0]
    np_array = np.array(pil_image)
    bgr_array = cv2.cvtColor(np_array, cv2.COLOR_RGB2BGR)
    print("Image Converted for:", page_number)
    return bgr_array

rect = [270,790, 240,3150]
def crop_image(image, rect):
    print("Image Cropped")
    return image[rect[0]:rect[1], rect[2]:rect[3]]
# plt.imshow(crop_image(image, rect))

def process_table(cropped_img):
    text = pytesseract.image_to_string(cropped_img, config='--psm 6 --user-patterns [&.]')
    # print(text)
    print("Data Extracted")
    table = text[:len(text)-1].split('\n')
    headers = table.pop(0).split(' ')
#     headers.pop(1)
    headers = ['COURSE', 'ISE', 'ESE', 'TOTAL', 'TW', 'PR', 'OR', 'Tot%', 'Crd', 'Grd', 'GP', 'CP', 'P&R', 'ORD']
    # print(headers)
    table = [re.sub(r'\b(?:[A-Za-z&]{3,}|OF|&|\.(?!\d)|IN|IT)\b','' ,row) for row in table]
    table = [row.split(' ') for row in table]
    for row_idx in range(len(table)):
        row = table[row_idx]
        updated_row = []
        for element in row:
            element = element.strip('&.>* ')
            if element != '':
                updated_row.append(element)
        table[row_idx] = updated_row
        if(len(table[row_idx])== 0): 
            table.pop(row_idx)
    df = pd.DataFrame(table)
    df = df.mask(df.eq('None')).dropna()
    display(df)
    db_data = df.to_json(orient='records')
    return db_data


with open(pdf_path, 'rb') as f:
    pdf = PyPDF2.PdfReader(f)
    num_pages = len(pdf.pages)
#     print(num_pages)
# def process_page_wrapper(page_number):
#     print("Extracting Page: ", page_number)
#     data = process_table(crop_image(convert_to_image(page_number), rect))
#     print("Extracted:", page_number)
#     return data

# with ThreadPoolExecutor(max_workers=4) as executor:
#     futures = [executor.submit(process_page_wrapper, page_number) for page_number in range(1,num_pages+1)]
#     results = [future.result() for future in futures]
# print(results)
result = []
for page in range(1,num_pages+1):
    result.append(process_table(crop_image(convert_to_image(page), rect)))