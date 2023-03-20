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
import sys
# pdf_path = 'CEGP012620_S.E.(2019 PAT.)(INFORMATIOM TECHNOLOGY) (1).pdf'
# coords = [[270,790, 240,3150]]
pdf_path = sys.argv[1]
ip_list = list(map(int, sys.argv[2].split(',')))
num_pages = int(sys.argv[3])
coords = []
if len(ip_list) > 4:
    for i in range(0,len(ip_list)-3, 4):
        coords.append(ip_list[i:i+4])
else:
    coords.append(ip_list)

# print(coords)
def convert_to_image(page_number):
    pil_image = pdf2image.convert_from_path(pdf_path,dpi=300,first_page=page_number, last_page=page_number)[0]
    np_array = np.array(pil_image)
    bgr_array = cv2.cvtColor(np_array, cv2.COLOR_RGB2BGR)
    # print("Image Converted for:", page_number)
    return bgr_array

def crop_image(image, rect):
    # print("Image Cropped")
    return image[rect[0]:rect[1], rect[2]:rect[3]]
# plt.imshow(crop_image(image, rect))

def process_table(cropped_img):
    text = pytesseract.image_to_string(cropped_img, config='--psm 6 --user-patterns [&.]')
    # print(text)
    # print("Data Extracted")
    table = text[:len(text)-1].split('\n')
    headers = table.pop(0).split(' ')
#     headers.pop(1)
    headers = ['SubjectSubCode', 'Insem', 'Endsem', 'TOTAL', 'TW', 'PR', 'OR', 'Tot%', 'Crd', 'Grd', 'GP', 'CP', 'P&R', 'ORD']
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
    df = pd.DataFrame(table, columns=headers)
    df = df.mask(df.eq('None')).dropna()
    df = df.replace('\/\d+', "", regex=True)
    df = df.drop(['TOTAL','Tot%', 'Crd', 'Grd', 'GP', 'CP', 'P&R', 'ORD'], axis=1)
    df[['Insem', 'Endsem', 'TW','OR','PR']] = df[['Insem', 'Endsem', 'TW','OR','PR']].apply(pd.to_numeric, errors='coerce').astype('Int32')
    db_data = df.to_json(orient='records')
    return db_data


# with open(pdf_path, 'rb+') as f:
#     pdf = PyPDF2.PdfReader(f)
#     num_pages = pdf.getNumPages()

# result = []
for page in range(1,num_pages+1):
    for rect in coords:
        # print("coordinates:", rect)
        print(process_table(crop_image(convert_to_image(page), rect)))
        print("|")
        sys.stdout.flush()