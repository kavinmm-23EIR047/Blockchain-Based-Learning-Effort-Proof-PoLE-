import json
import os
import random
from typing import List, Dict, Union, Optional

# -------------------------------
# Question templates for variety
# -------------------------------
QUESTION_TEMPLATES = [
    "Which description best matches the concept \"{concept}\"?",
    "Select the correct description for \"{concept}\".",
    "What is the meaning of \"{concept}\"?",
    "Identify the statement that correctly defines \"{concept}\".",
    "Which of the following describes \"{concept}\" accurately?"
]

# ---------------------------------
# Load dataset with optional title search
# ---------------------------------
def load_concepts(title: Optional[str] = None) -> Dict[str, Union[str, List[Dict[str, str]]]]:
    """
    Loads concept data from course_data.json.
    If `title` is provided, selects the topic matching that title.
    
    Returns:
        {
            "title": "Topic Title",
            "concepts": [ {concept, description}, ... ]
        }
    """
    data_file = os.path.join("backend", "data", "course_data.json")

    if not os.path.exists(data_file):
        raise FileNotFoundError("❌ course_data.json not found")

    with open(data_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    # If JSON is a dict with title/concepts
    if isinstance(data, dict) and "concepts" in data:
        topic_title = data.get("title", "Untitled Quiz")
        concepts_list = data["concepts"]
    # If JSON is a list of topics
    elif isinstance(data, list):
        if title:
            # Search for matching title
            topic = next((t for t in data if t.get("title", "").lower() == title.lower()), None)
            if not topic:
                raise ValueError(f"❌ Title '{title}' not found in dataset")
            topic_title = topic.get("title", "Untitled Quiz")
            concepts_list = topic.get("concepts", [])
        else:
            # Pick random topic if no title provided
            topic = random.choice(data)
            topic_title = topic.get("title", "Untitled Quiz")
            concepts_list = topic.get("concepts", [])
    else:
        raise ValueError("❌ Invalid JSON structure")

    # Validate concepts
    if not concepts_list or not isinstance(concepts_list, list):
        raise ValueError(f"❌ No concepts found for topic '{topic_title}'")

    for idx, item in enumerate(concepts_list):
        if not isinstance(item, dict):
            raise ValueError(f"❌ Item at index {idx} is not an object")
        if "concept" not in item or "description" not in item:
            raise ValueError(f"❌ Each item must have 'concept' and 'description' fields (error at index {idx})")

    return {"title": topic_title, "concepts": concepts_list}

# ---------------------------------
# Generate random MCQs for a topic
# ---------------------------------
def generate_mcqs(num_questions: int = 5, title: Optional[str] = None) -> Dict[str, Union[str, List[Dict[str, object]]]]:
    """
    Generates multiple-choice questions (MCQs) for a topic.
    - num_questions: number of questions to generate
    - title: optional topic title to select
    Returns:
        {
            "title": "Quiz Title",
            "questions": [ {question, options, answer}, ... ]
        }
    """
    data = load_concepts(title)
    topic_title = data["title"]
    concepts = data["concepts"]

    if len(concepts) < 2:
        raise ValueError("❌ Not enough concepts to generate MCQs")

    num_questions = min(num_questions, len(concepts))
    random.shuffle(concepts)
    selected_concepts = concepts[:num_questions]

    questions = []
    for item in selected_concepts:
        correct_answer = item["description"]

        # Generate wrong options
        wrong_pool = [c["description"] for c in concepts if c["description"] != correct_answer]
        wrong_options = random.sample(wrong_pool, min(3, len(wrong_pool)))
        options = wrong_options + [correct_answer]
        random.shuffle(options)  # Randomize options every time

        # Select random question template
        template = random.choice(QUESTION_TEMPLATES)
        question_text = template.format(concept=item['concept'])

        questions.append({
            "question": question_text,
            "options": options,
            "answer": correct_answer
        })

    return {"title": topic_title, "questions": questions}

# ---------------------------------
# Manual Test (Optional)
# ---------------------------------
if __name__ == "__main__":
    # Simulate OCR detection
    ocr_detected_title = "Introduction to Generative AI"  # Replace with actual OCR
    quiz_data = generate_mcqs(num_questions=5, title=ocr_detected_title)

    print(f"\n===== Quiz Topic: {quiz_data['title']} =====\n")
    for i, q in enumerate(quiz_data["questions"], start=1):
        print(f"Q{i}. {q['question']}")
        for idx, opt in enumerate(q["options"], start=65):
            print(f"   {chr(idx)}. {opt}")
        correct_letter = chr(q["options"].index(q["answer"]) + 65)
        print(f"✅ Correct Answer: {correct_letter}\n")
