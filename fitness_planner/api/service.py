import google.generativeai as genai
import json
from .keys import GEMINI_API_KEY

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_fitness_plan(username: str, goal: str, intensity: str, info: str = None):
    """
    Generates a personalized fitness plan using Gemini AI.
    """
    prompt = f"""
    Create a personalized 7-day fitness plan and nutrition tip for a user named {username}.
    Goal: {goal}
    Intensity Level: {intensity}
    Additional Info: {info if info else 'None provided'}

    Please provide the response in the following JSON format:
    {{
        "workout_plan": [
            {{"day": "Day 1", "title": "Workout Title", "exercises": ["Exercise 1", "Exercise 2"]}},
            ...
            {{"day": "Day 7", "title": "Workout Title", "exercises": ["Exercise 1", "Exercise 2"]}}
        ],
        "nutrition_tip": "A concise and helpful nutrition tip based on the goal."
    }}

    IMPORTANT: Return ONLY the raw JSON object without any markdown formatting or extra text.
    """

    try:
        response = model.generate_content(prompt)
        # Attempt to parse JSON from the response
        response_text = response.text.strip()
        # Remove potential markdown code blocks
        if response_text.startswith("```json"):
            response_text = response_text[7:-3].strip()
        elif response_text.startswith("```"):
            response_text = response_text[3:-3].strip()
            
        plan_data = json.loads(response_text)
        return plan_data
    except Exception as e:
        print(f"Error generating AI plan: {e}")
        # Fallback to mock plan if AI fails
        return get_mock_plan(goal, intensity)

def get_mock_plan(goal, intensity):
    multiplier = 1
    if intensity == "Beginner": multiplier = 0.8
    elif intensity == "Advanced": multiplier = 1.2
    elif intensity == "Elite": multiplier = 1.5

    workout_plan = [
        {"day": "Day 1", "title": f"{goal} - Push Day", "exercises": [f"Bench Press - 3x{int(10*multiplier)}", "Push-ups - 3xMax"]},
        {"day": "Day 2", "title": f"{goal} - Pull Day", "exercises": [f"Pull-ups - 3x{int(8*multiplier)}", f"Barbell Row - 3x{int(10*multiplier)}"]},
        {"day": "Day 3", "title": "Rest/Recovery", "exercises": ["Stretching", "Light walk"]},
        {"day": "Day 4", "title": f"{goal} - Leg Day", "exercises": [f"Squats - 3x{int(12*multiplier)}", f"Lunge - 3x{int(10*multiplier)}"]},
        {"day": "Day 5", "title": f"{goal} - Shoulder & Core", "exercises": [f"Overhead Press - 3x{int(10*multiplier)}", f"Plank - 3x1 min"]},
        {"day": "Day 6", "title": "Full Body HIIT", "exercises": [f"Burpees - 3x{int(15*multiplier)}", "Mountain Climbers - 3x30"]},
        {"day": "Day 7", "title": "Rest Day", "exercises": ["Full Rest"]}
    ]

    return {
        "workout_plan": workout_plan,
        "nutrition_tip": f"Maintain a balanced diet focused on {goal}."
    }
