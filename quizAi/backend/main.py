import sys
import os
import requests
from io import BytesIO
from PIL import Image

# -------------------------------
# Ensure imports work anywhere
# -------------------------------
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from llm_utils import generate_mcqs
import ocr_utils

def fetch_image_from_url(url: str) -> str:
    response = requests.get(url)
    if response.status_code != 200:
        raise ValueError(f"❌ Failed to download image: {response.status_code}")
    img = Image.open(BytesIO(response.content))
    temp_path = os.path.join(current_dir, "temp_cert.png")
    img.save(temp_path)
    return temp_path

def main(num_questions: int = 5, certificate_image_url: str = None):
    detected_title = None
    temp_image_path = None

    if certificate_image_url:
        try:
            temp_image_path = fetch_image_from_url(certificate_image_url)
            detected_title = ocr_utils.detect_title(temp_image_path)
            print(f"📄 OCR Detected Title: {detected_title}")
        except Exception as e:
            print(f"❌ OCR failed: {e}")
            print("Using default topic instead.")
        finally:
            if temp_image_path and os.path.exists(temp_image_path):
                os.remove(temp_image_path)

    try:
        quiz_data = generate_mcqs(num_questions, title=detected_title)
    except Exception as e:
        print(f"❌ Error generating quiz: {e}")
        return

    print(f"\n========== QUIZ: {quiz_data['title']} ==========\n")
    for i, q in enumerate(quiz_data["questions"], start=1):
        print(f"Q{i}. {q['question']}")
        for idx, option in enumerate(q["options"], start=65):
            print(f"   {chr(idx)}. {option}")
        correct_letter = chr(q["options"].index(q["answer"]) + 65)
        print(f"✅ Correct Answer: {correct_letter}\n")
    print("========== END OF QUIZ ==========\n")

if __name__ == "__main__":
    cert_url = "https://www.simplilearn.com/ice9/skillupcertificates/Tools_Google_Analytics.png"
    main(num_questions=5, certificate_image_url=cert_url)
