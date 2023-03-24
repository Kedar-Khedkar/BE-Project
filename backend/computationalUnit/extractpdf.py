"""
    It takes a PDF file, and returns a JSON string of the data in the PDF
"""
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


# Taking the command line arguments and storing them in the variables.
pdf_path = sys.argv[1]
ip_list = list(map(int, sys.argv[2].split(',')))
seatno_list = list(map(int, sys.argv[3].split(',')))
num_pages = int(sys.argv[4])
coords = []
seatNos = []
config = '--psm 6 --oem 1'

# This is to split the coordinates into groups of 4.
if len(ip_list) > 4:
    for i in range(0,len(ip_list)-3, 4):
        coords.append(ip_list[i:i+4])
else:
    coords.append(ip_list)

if len(seatno_list) > 4:
    for i in range(0,len(seatno_list)-3, 4):
        seatNos.append(seatno_list[i:i+4])
else:
    seatNos.append(seatno_list)

def printToErr(*args, **kwargs):
    """
    It prints to stderr
    """
    print(*args, file=sys.stderr, **kwargs)
    sys.stderr.flush()

def convert_to_image(page_number):
    """
    It takes a page number and returns a BGR image
    @param page_number - The page number of the PDF that you want to convert to an image.
    @returns A numpy array of the image
    """
    pil_image = pdf2image.convert_from_path(pdf_path,dpi=300,first_page=page_number, last_page=page_number)[0]
    np_array = np.array(pil_image)
    bgr_array = cv2.cvtColor(np_array, cv2.COLOR_RGB2BGR)
    return bgr_array

def crop_image(image, rect):
    """
    It takes an image and a rectangle, and returns the image cropped to the rectangle
    @param image - the image to be cropped
    @param rect - The rectangle to crop the image to.
    @returns The image is being cropped to the dimensions of the rectangle.
    """
    return image[rect[0]:rect[1], rect[2]:rect[3]]

def extract_seatno(cropped_img):
    """
    It takes in a cropped image of the seat number, and returns the seat number if it can find one,
    otherwise it returns None
    @param cropped_img - The image to be processed.
    @returns The seat number is being returned.
    """
    text = pytesseract.image_to_string(cropped_img, config=config).replace('$','').strip()
    text = text.split(' ')
    for word in text:
        if re.match(r'^[A-Z]\d{9}$', word):
            return word
    return None

def process_row(row, no_of_cols):
    """
    It takes a row of data, removes all the unwanted characters, and returns the row
    @param row - The row that is being processed
    @param no_of_cols - The number of columns in the output file.
    @returns A list of lists.
    """
    updated_row = []
    subCode = row[0]
    row = row[-13:]
    row.insert(0, subCode)
    for idx in range(len(row)):
        element = row[idx]
        element = element.strip('&.>*x# ')
        updated_row.append(element)
    if len(updated_row) != no_of_cols:
        printToErr(updated_row)
        return []
    return updated_row

def process_table(cropped_img, seatno):
    """
    It takes a cropped image of the table, and returns a JSON string of the table data
    @param cropped_img - The image of the table
    @param seatno - Seat number of the student
    @returns A JSON string of the dataframe
    """
    text = pytesseract.image_to_string(cropped_img, config=config)
    table = text[:len(text)-1].split('\n')
    headers = ['SubjectSubCode', 'Insem', 'Endsem', 'TOTAL', 'TW', 'PR', 'OR', 'Tot%', 'Crd', 'Grd', 'GP', 'CP', 'P&R', 'ORD']
    table = [row.split(' ') for row in table]
    for row_idx in range(len(table)):
        row = table[row_idx]
        table[row_idx] = process_row(row, len(headers))
    for row in table:
        if len(row) == 0:
            table.remove(row)
    df = pd.DataFrame(table, columns=headers)
    df = df.mask(df.eq('None')).dropna()
    df = df.replace('\/\d+', "", regex=True)
    df[['Insem', 'Endsem', 'TOTAL', 'TW', 'PR', 'OR', 'Tot%', 'Crd', 'GP', 'CP', 'P&R', 'ORD']] = df[['Insem', 'Endsem', 'TOTAL', 'TW', 'PR', 'OR', 'Tot%', 'Crd', 'GP', 'CP', 'P&R', 'ORD']].apply(pd.to_numeric, errors='coerce').astype('Int32')
    df['seatno'] = seatno
    db_data = df.to_json(orient='records')
    return db_data

# Iterating over the pages of the PDF, and for each page, it is iterating over the seat numbers and
# the coordinates of the tables.
for page in range(1,num_pages+1):
    image = convert_to_image(page)
    for rect in zip(seatNos,coords):
        print(process_table(crop_image(image, rect[1]), extract_seatno(crop_image(image, rect[0]))))
        print("|")
        sys.stdout.flush()