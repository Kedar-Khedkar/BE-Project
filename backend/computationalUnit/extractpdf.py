import sys
import json
file = str(sys.argv[1])
import io
import re
import pandas as pd
from io import StringIO

from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
import json

pdfminer_string = StringIO()
with open(file, "rb") as in_file:
    parser = PDFParser(in_file)
    doc = PDFDocument(parser)
    rsrcmgr = PDFResourceManager()
    device = TextConverter(rsrcmgr,
                           pdfminer_string,
                           laparams=LAParams())
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    for page in PDFPage.create_pages(doc):
        interpreter.process_page(page)
pdfminer_lines = pdfminer_string.getvalue().splitlines()
pdfminer_lines = [ln.lower() for ln in pdfminer_lines if ln]

def stopLines(line):
  if line == ' ': return True
  line = line.lower()
  if 'savitri' in line or 'college' in line or 'branch' in line or 'sgpa' in line or 'course' in line:
    return True
  if '.....' in line:
    return True

data = {}
currsem = 0
extracted_data = []
for i in range(len(pdfminer_lines)):
  line = pdfminer_lines[i]
  if stopLines(line): continue
  if 'seat' in line:
    line = line.split()
    data['seatno'] = line[2]
    data['prn'] = line[-3]
  elif 'sem' in line:
    if currsem == 1:
      currsem = 2
    else: currsem = 1
    data['sem'] = currsem
  else:
    data['subcode'] = line[:10].strip()
    line = line[43:].split()
    data['ise'] = line[0][:3] 
    data['ese'] = line[1][:3]
    data['total'] = line[2][:3]
    data['tw'] = line[3][:3]
    data['pr'] = line[4][:3]
    data['or'] = line[5][:3]
    data['tot'] = line[6]
    data['crd'] = line[7]
    data['grd'] = line[8]
    data['gp'] = line[9]
    data['cp'] = line[10]
    data['Pr'] = line[11]
    data['ord'] = line[12]
    print(data)
#     extracted_data.append(data)
#     #print(extracted_data[-1])
# alldata = {"data": extracted_data }
# print(alldata) 



#print(extracted_data)

# thisdict =	[{
#   "brand": "Ford",
#   "model": "Mustang",
#   "year": 1964
# }]
# ##data = []
# alldata = {"data": thisdict}
# print(json.dumps(thisdict))
