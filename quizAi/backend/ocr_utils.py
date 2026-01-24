from PIL import Image, ImageEnhance, ImageFilter
import pytesseract
import cv2
import numpy as np
import re
import os

# Set path to Tesseract OCR executable
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def preprocess_image(image_path):
    """
    Preprocess image for OCR:
    - Convert to grayscale
    - Apply thresholding
    - Increase contrast
    - Denoise and sharpen
    """
    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError(f"Image not found: {image_path}")

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.fastNlMeansDenoising(gray, h=30)
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    kernel = np.array([[0, -1, 0],
                       [-1, 5,-1],
                       [0, -1, 0]])
    sharpened = cv2.filter2D(thresh, -1, kernel)
    temp_path = image_path.replace(".jpg", "_preprocessed.jpg")
    cv2.imwrite(temp_path, sharpened)
    return temp_path

def extract_text(image_path):
    """
    Run OCR on preprocessed image
    """
    preprocessed_path = preprocess_image(image_path)
    img = Image.open(preprocessed_path)
    custom_config = r'--oem 3 --psm 6'
    text = pytesseract.image_to_string(img, lang='eng', config=custom_config)
    # Remove temp preprocessed file
    if os.path.exists(preprocessed_path):
        os.remove(preprocessed_path)
    return text

def get_course_title(text):
    """
    Extract course title using regex and heuristics
    """
    patterns = [
        r'Course\s*Title[:\-]?\s*(.*)',
        r'Certification\s*in[:\-]?\s*(.*)',
        r'This\s*certifies\s*that\s*.*\s*has\s*completed\s*(.*)']
    
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match and match.group(1).strip():
            return match.group(1).strip()
    
    # Fallback: longest line (likely title)
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    if lines:
        return max(lines, key=len)
    
    return "Unknown Course"

# ✅ This is the function main.py expects
def detect_title(image_path: str) -> str:
    text = extract_text(image_path)
    title = get_course_title(text)
    return title
